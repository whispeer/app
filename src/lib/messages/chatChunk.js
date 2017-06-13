var h = require("whispeerHelper");
var validator = require("validation/validator");
var Observer = require("asset/observer");
var SecuredData = require("asset/securedDataWithMetaData");
var Bluebird = require("bluebird");
var debug = require("debug");

var userService = require("user/userService");
var socket = require("services/socket.service").default;
var keyStore = require("services/keyStore.service").default;
var sessionService = require("services/session.service").default;
var initService = require("services/initService");

var Cache = require("services/Cache.ts").default;

var Message = require("models/message");

var ImageUpload = require("services/imageUploadService");

var debugName = "whispeer:chunk";
var chunkDebug = debug(debugName);

var chunksByID = {}, chunksLoadingByID = {};

var Chunk = function (data) {
	var theChunk = this

	var err = validator.validate("topic", data.meta);
	if (err) {
		throw err;
	}

	// extra data: data.server

	data.meta.receiver.sort();

	var meta = SecuredData.load(undefined, data.meta, {
		type: "topic", // Keep topic for now until lots of clients have picked up the change
		alternativeType: "chatChunk" // Allow for chatChunk already
	});

	var receiver = meta.metaAttr("receiver");
	var addedReceivers = meta.metaAttr("addedReceivers") || []

	this.data = {
		loaded: false,
		verified: false,

		partners: [],
		partnersDisplay: [],

		remainingUser: "",
		remainingUserTitle: "",

		id: data.server.chunkID,
		type: (receiver.length <= 2 ? "peerChat" : "groupChat"),
		obj: this
	};

	this.awaitEarlierSend = function (time) {
		var previousMessages = this.getNotSentMessages().filter(function (message) {
			return message.getTime() < time;
		});

		if (previousMessages.length === 0) {
			return Bluebird.resolve();
		}

		return previousMessages[previousMessages.length - 1].getSendPromise();
	};

	this.getSecuredData = function () {
		return meta;
	};

	this.getHash = function () {
		return meta.getHash();
	};

	this.getID = function () {
		return h.parseDecimal(data.server.id);
	};

	this.getTime = function () {
		if (data.server.createTime) {
			return data.server.createTime
		}

		return this.getSecuredData().metaAttr("createTime");
	};

	this.getKey = function () {
		return meta.metaAttr("_key");
	};

	this.sendUnsentMessage = function (messageData, files) {
		var images = files.map(function (file) {
			return new ImageUpload(file);
		});

		return this.sendMessage(messageData.message, images, messageData.id);
	};

	this.sendMessage = function (message, images, id) {
		var messageObject = new Message(this, message, images, id);
		// messagesByID[messageObject.getID()] = messageObject;
		this.addMessage(messageObject);

		var messageSendCache = new Cache("messageSend", { maxEntries: -1, maxBlobSize: -1 });

		if (!id) {
			Bluebird.resolve(images).bind(this).map(function (img) {
				return img.prepare().thenReturn(img)
			}).map(function (img) {
				return img._blobs[0].blob._blobData
			}).then(function (imagesBlobs) {
				messageSendCache.store(
					messageObject.getID(),
					{
						chunkID: this.getID(),
						id: messageObject.getID(),
						message: message
					},
					imagesBlobs
				);
			})
		}

		var sendMessagePromise = messageObject.sendContinously();

		sendMessagePromise.then(function () {
			return messageSendCache.delete(messageObject.getID());
		});

		sendMessagePromise.catch(function (e) {
			console.error(e);
			alert("An error occured sending a message!" + e.toString());
		});

		return null;
	};

	this.ensureChunkChain = function (predecessor) {
		var predecessorID = this.getPredecessorID()

		if (predecessorID === predecessor) {
			return
		}

		if (!predecessorID || !chunksByID[predecessorID]) {
			throw new Error()
		}

		chunksByID[predecessorID].ensureChunkChain(predecessor)
	}

	this.verify = function(cb) {
		return Bluebird.try(function () {
			return userService.get(meta.metaAttr("creator"));
		}).then(function (creator) {
			if (creator.isNotExistingUser()) {
				theChunk.data.disabled = true;
				return false;
			}

			return meta.verify(creator.getSignKey()).thenReturn(true);
		}).then(function (addEncryptionIdentifier) {
			if (addEncryptionIdentifier) {
				keyStore.security.addEncryptionIdentifier(meta.metaAttr("_key"));
			}
		}).nodeify(cb);
	};

	this.loadReceiverNames = function (cb) {
		if (this._loadReceiverNamesPromise) {
			return this._loadReceiverNamesPromise
		}

		this._loadReceiverNamesPromise = Bluebird.try(function () {
			return Bluebird.all([
				userService.getMultipleFormatted(receiver),
				userService.getMultipleFormatted(addedReceivers)
			])
		}).spread(function (receiverObjects, addedReceivers) {
			var partners = receiverObjects.filter(function (receiverObject) {
				return !receiverObject.user.isOwn() || receiverObjects.length === 1
			});

			var maxDisplay = 3;
			var displayCount = (partners.length > maxDisplay) ? 2 : partners.length;

			theChunk.data.partnersDisplay = partners.slice(0, displayCount);
			theChunk.data.partners = partners
			theChunk.data.receivers = receiverObjects

			theChunk.data.addedReceivers = addedReceivers

			if (partners.length > displayCount) {
				theChunk.data.remainingUser = partners.length - displayCount;

				var i = 0;
				for (i = displayCount; i < partners.length; i += 1) {
					theChunk.data.remainingUserTitle += partners[i].name;
					if (i < partners.length - 1) {
						theChunk.data.remainingUserTitle += ", ";
					}
				}
			}
		}).nodeify(cb);

		return this._loadReceiverNamesPromise
	};

	this.getReceiver = function () {
		return receiver;
	};

	this.loadAllData = function () {
		return Bluebird.all([
			this.verify(),
			this.loadReceiverNames(),
		]).bind(this).then(function () {
			var predecessorID = this.getPredecessorID()
			var predecessor = chunksByID[predecessorID]

			if (predecessorID && predecessor) {
				predecessor.setSuccessor(this.getID())
			}

			this.data.verified = true;
		})
	};

	this.isAdmin = function (user) {
		return this.getCreator() === user.getID()
	}

	this.amIAdmin = function () {
		return this.isAdmin(userService.getown())
	}

	this.getCreator = function () {
		return h.parseDecimal(meta.metaAttr("creator"))
	}

	this.addReceivers = function (newReceiverIDs, canReadOldMessages) {
		var oldReceivers = this.getReceiver()

		return this.setReceivers(oldReceivers.concat(newReceiverIDs), {
			addedReceivers: [].concat(newReceiverIDs)
		}, canReadOldMessages)
	}

	this.setReceivers = function (receivers, extraMeta, canReadOldMessages) {
		if (!this.amIAdmin()) {
			throw new Error("Not an admin of this chunk")
		}

		return this.getSuccessor().bind(this).then(function (successor) {
			if (successor) {
				throw new Error("TODO: Chunk has a successor. Try again?")
			}

			return Chunk.createRawData(receivers, this, extraMeta)
		}).then(function (topicData) {
			if (!canReadOldMessages) {
				return topicData
			}

			// TODO:  encrypt this chunks (and previous chunks) key with new chunks key

			throw new Error("not yet implemented")
		}).then(function (chunkData) {
			return socket.emit("chat.chunk.create", {
				predecessorID: this.getID(),
				chunk: chunkData.topic,
				keys: chunkData.keys,
				receiverKeys: chunkData.receiverKeys
			})
		}).then(function (response) {
			return Chunk.fromData(response.successorTopic)
		})
	}

	this.hasPredecessor = function () {
		return !!meta.metaAttr("predecessor")
	}

	this.getPredecessorID = function () {
		if (!this.hasPredecessor()) {
			return null
		}

		return h.parseDecimal(meta.metaAttr("predecessor"))
	}

	this.getPredecessor = function () {
		if (!this.hasPredecessor()) {
			return null
		}

		return Chunk.get(this.getPredecessorID(), true).catch(function (err) {
			console.log(err)
			return null
		}, socket.errors.Server)
	}

	this.setSuccessor = function (successorID) {
		this.successorID = successorID

		console.warn("Set successor of topic " , this.getID(), " succ: ", successorID)

		this.notify({ successorID: successorID }, "successor")
	}

	this.hasKnownSuccessor = function () {
		return !!this.successorID
	}

	this.getLoadedSuccessor = function () {
		if (!this.hasKnownSuccessor()) {
			return
		}

		return chunksByID[this.successorID]
	}

	this.getSuccessor = function () {
		if (this.sucessorID) {
			return Chunk.get(this.sucessorID)
		}

		return socket.emit("messages.topic.successor", { topicID: this.getID() }).bind(this).then(function (response) {
			if (!response.topic) {
				return
			}

			return Chunk.fromData(response.topic).then(function (successorTopic) {
				if (successorTopic.getPredecessorID() !== this.getID()) {
					throw new Error("server returned invalid successor topic")
				}

				return successorTopic
			})
		})
	}

	Observer.extend(theChunk);
};

Chunk.multipleFromData = function (topicsData) {
	return Bluebird.resolve(topicsData).map(function (topicData) {
		return Chunk.createTopicAndAdd(topicData);
	}).map(function (topic) {
		return Chunk.loadTopic(topic).then(function () {
			return topic.loadNewest()
		}).thenReturn(topic)
	})
};

Chunk.loadInChunks = function (topicsData, count) {
	var load = topicsData.slice(0, count)
	var remaining = topicsData.slice(count)

	if (topicsData.length === 0) {
		return Bluebird.resolve([])
	}

	return Chunk.multipleFromData(load).then(function (topics) {
		return Chunk.loadInChunks(remaining, count).then(function (otherTopics) {
			return topics.concat(otherTopics)
		})
	})
}

Chunk.createTopicAndAdd = function (topicData) {
	var topicID = h.parseDecimal(topicData.topicid)

	if (chunksByID[topicID]) {
		return chunksByID[topicID]
	}

	var topic = new Chunk(topicData);

	topic.findSuccessor()

	chunksByID[topicID] = topic

	delete chunksLoadingByID[topicID]

	return topic;
};

Chunk.loadTopic = function (topic) {
	if (topic.data.verified) {
		return Bluebird.resolve(topic);
	}

	return topic.loadAllData().then(function () {
		chunkDebug("Topic loaded (" + topic.getID() + "):" + (new Date().getTime() - startup));
	}).thenReturn(topic)
};

Chunk.fromData = function (topicData, noAutoLoad) {
	return Bluebird.resolve(topicData).then(function (topicData) {
		var topic = Chunk.createTopicAndAdd(topicData);
		return Chunk.loadTopic(topic);
	}).then(function (topic) {
		if (!noAutoLoad) {
			return topic.loadNewest().thenReturn(topic)
		}

		return topic
	});
};

Chunk.loadTopicChain = function (newTopic, oldTopic) {
	if (newTopic.getPredecessorID() === oldTopic.getID()) {
		return Bluebird.resolve()
	}

	return newTopic.getPredecessor().then(function (pred) {
		if (!pred) {
			return
		}

		if (pred.getID() === oldTopic.getID()) {
			return
		}

		return Chunk.loadTopicChain(pred, oldTopic)
	})
}

Chunk.getLoadedTopic = function (topicid) {
	return chunksByID[topicid]
}

Chunk.get = function (chunkID) {
	if (chunksByID[chunkID]) {
		return Bluebird.resolve(chunksByID[chunkID])
	}

	if (chunksLoadingByID[chunkID]) {
		return chunksLoadingByID[chunkID]
	}

	chunksLoadingByID[chunkID] = initService.awaitLoading().then(function () {
		return socket.definitlyEmit("chat.chunk.get", {
			id: chunkID
		});
	}).then(function (data) {
		return Chunk.fromData(data.topic);
	})

	return chunksLoadingByID[chunkID]
};

Chunk.createRawData = function (receiver, predecessorChunk, extraMeta) {
	var receiverObjects, chunkKey;
	return Bluebird.try(function () {
		//load receiver
		receiver = receiver.map(function (val) {
			if (typeof val === "object") {
				return val.getID();
			} else {
				return h.parseDecimal(val);
			}
		});

		h.removeArray(receiver, sessionService.getUserID());

		//get receiver objects
		return userService.getMultiple(receiver);
	}).then(function (receiverO) {
		receiverObjects = receiverO;

		//generate topic key
		return keyStore.sym.generateKey(null, "topicMain");
	}).then(function (key) {
		chunkKey = key;

		//encrypt topic key with own mainkey
		return keyStore.sym.symEncryptKey(chunkKey, userService.getown().getMainKey());
	}).then(function () {
		//encrypt topic key for receiver
		return Bluebird.all(receiverObjects.map(function (receiverObject) {
			var crypt = receiverObject.getCryptKey();
			return keyStore.sym.asymEncryptKey(chunkKey, crypt);
		}));
	}).then(function (cryptKeys) {
		var cryptKeysData = keyStore.upload.getKeys(cryptKeys);
		var receiverKeys = {}, receiverIDs = [];

		receiverObjects.forEach(function (receiver, index) {
			receiverIDs.push(receiver.getID());
			receiverKeys[receiver.getID()] = cryptKeys[index];
		});

		receiverIDs.push(userService.getown().getID());
		receiverIDs.sort();

		// chunk signable data.
		var chunkMeta = Object.assign({
			createTime: new Date().getTime(),
			receiver: receiverIDs,
			creator: userService.getown().getID()
		}, extraMeta || {});

		if (predecessorChunk) {
			chunkMeta.predecessor = predecessorChunk.getID()
		}

		//create data
		var chunkData = {
			keys: cryptKeysData.concat([keyStore.upload.getKey(chunkKey)]),
			receiverKeys: receiverKeys
		};

		var secured = SecuredData.createRaw({}, chunkMeta, { type: "topic" })

		if (predecessorChunk) {
			secured.setParent(predecessorChunk.getSecuredData())
		}

		return secured.signAndEncrypt(userService.getown().getSignKey(), chunkKey).then(function (cData) {
			chunkData.chunk = cData.meta

			return chunkData
		})
	})
};

Chunk.createData = function (receiver, message, images, cb) {
	var imagePreparation = Bluebird.resolve(images).map(function (image) {
		return image.prepare();
	});

	function uploadImages(chunkKey) {
		return Bluebird.all(images.map(function (image) {
			return image.upload(chunkKey);
		}));
	}

	var resultPromise = Bluebird.all([Chunk.createRawData(receiver), imagePreparation]).spread(function (chunkData, imagesMeta) {
		var chunk = new Chunk({
			meta: chunkData.chunk,
			server: {},
			unread: []
		});

		var messageMeta = {
			createTime: new Date().getTime(),
			images: imagesMeta
		};

		return Bluebird.all([
			chunkData,
			Message.createRawData(chunk, message, messageMeta),
			uploadImages(chunk.getKey())
		]);
	}).spread(function (chunkData, messageData, imageKeys) {
		imageKeys = h.array.flatten(imageKeys);
		messageData.imageKeys = imageKeys.map(keyStore.upload.getKey);

		chunkData.message = messageData;

		return chunkData;
	});

	return resultPromise.nodeify(cb);
};

Observer.extend(Chunk);

module.exports = Chunk;
