var h = require("whispeerHelper");
var validator = require("validation/validator");
var Observer = require("asset/observer");
var sortedSet = require("asset/sortedSet");
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
var TopicTitleUpdate = require("messages/topicTitleUpdate").default;

var ImageUpload = require("services/imageUploadService");

var windowService = require("services/windowService");


var UPDATE_WHISPEER_NEW_CHAT = "Du verwendest eine alte Version von whispeer die zusammenhängende Chats nicht darstellen kann. \n Bitte aktualisiere whispeer!"
var UPDATE_WHISPEER_OLD_CHAT = "Du verwendest eine alte Version von whispeer die zusammenhängende Chats nicht darstellen kann. \n Dieser Chat ist beendet. \n Bitte aktualisiere whispeer!"

var debugName = "whispeer:topic";
var topicDebug = debug(debugName);

function sortGetTime(a, b) {
	return (a.getTime() - b.getTime());
}

function sortObjGetTimeInv(a, b) {
	return (b.obj.getTime() - a.obj.getTime());
}

var topics = {}, messagesByID = {};
var topicArray = sortedSet(sortObjGetTimeInv);

var Topic = function (data) {
	var messages = sortedSet(sortGetTime),
		sortedTopicUpdates = sortedSet(sortGetTime),
		messagesAndUpdates = sortedSet(sortGetTime),
		topicUpdatesById = {},
		theTopic = this,
		loadInitial = true;

	var err = validator.validate("topic", data.meta);
	if (err) {
		throw err;
	}

	data.meta.receiver.sort();

	var meta = SecuredData.load(undefined, data.meta, {
		type: "topic",
		attributesNotVerified: ["newest", "topicid", "unread", "newestTime"]
	});

	var unreadMessages;

	function setUnread(newUnread) {
		newUnread = newUnread.map(h.parseDecimal);

		if (unreadMessages) {
			if (newUnread.length === 0 && unreadMessages.length > 0) {
				topicDebug("decrease unread count, topicid: " + data.topicid);
				Topic.notify(data.topicid, "read");
			} else if (newUnread.length > 0 && unreadMessages.length === 0) {
				topicDebug("increase unread count, topicid: " + data.topicid);
				Topic.notify(data.topicid, "unread");
			}
		}

		unreadMessages = newUnread;
		theTopic.data.unread = (unreadMessages.length > 0);

		messages.forEach(function (message) {
			message.unread = unreadMessages.indexOf(message.getID()) > -1;
		});
	}

	var receiver = meta.metaAttr("receiver");
	var addedReceivers = meta.metaAttr("addedReceivers") || []

	this.data = {
		loaded: false,
		verified: false,
		remaining: 1,

		messagesAndUpdates: messagesAndUpdates,

		partners: [],
		partnersDisplay: [],

		remainingUser: "",
		remainingUserTitle: "",

		newMessage: "",

		latestMessage: {
			data: {}
		},

		id: data.topicid,
		type: (receiver.length <= 2 ? "peerChat" : "groupChat"),
		obj: this
	};

	setUnread(data.unread);

	socket.on("connect", function () {
		window.setTimeout(function () {
			theTopic.refetchMessages();
		}, h.randomIntFromInterval(500, 5000));
	});

	this._addTopicUpdates = function (topicUpdatesData) {
		return Bluebird.resolve(topicUpdatesData).bind(this).filter(function (topicUpdateData) {
			return !topicUpdatesById[topicUpdateData.id];
		}).map(function (topicUpdateData) {
			if (!topicUpdateData) {
				return Bluebird.resolve();
			}

			return Topic.get(topicUpdateData.topicID).then(function (topicUpdateTopic) {
				var topicUpdateObject = new TopicTitleUpdate(topicUpdateData, topicUpdateTopic);

				topicUpdatesById[topicUpdateData.id] = topicUpdateObject;

				return topicUpdateObject.load().thenReturn(topicUpdateObject);
			})
		}).map(function (topicUpdate) {
			topicUpdate.ensureParent(this);

			return topicUpdate;
		}).then(function (topicUpdates) {
			topicUpdates.sort(sortGetTime);

			topicUpdates.reduce(function (prev, cur) {
				if (prev) {
					prev.ensureIsAfterTopicUpdate(cur);
				}

				return cur;
			}, false);

			sortedTopicUpdates.join(topicUpdates);
			messagesAndUpdates.join(topicUpdates);

			var latestTopicUpdate = sortedTopicUpdates.last();

			if (latestTopicUpdate) {
				return latestTopicUpdate.getTitle();
			}
		}).then(function (title) {
			this.data.title = title;
		});
	};

	this.refetchMessages = function () {
		if (this.fetchingMessages) {
			return this.refetchPromise;
		}

		this.fetchingMessages = true;

		/*
			{
				oldest: id,
				inBetween: [ids],
				newest: id
			}
		*/
		/*
			Topic.makeMessage
		*/

		var sentMessages = this.getSentMessages().map(function (message) {
			return message.getServerID();
		});

		var oldest = sentMessages[0];
		var newest = sentMessages[sentMessages.length - 1];

		var request = {
			topicid: this.getID(),
			oldest: oldest,
			newest: newest,
			inBetween: sentMessages.slice(1, -1),
			maximum: 20,
			messageCountOnFlush: 10
		};

		if (sentMessages.length === 0) {
			this.refetchPromise = this.loadMoreMessages()
			return this.refetchPromise
		}

		this.refetchPromise = socket.definitlyEmit("messages.refetch", request).bind(this).then(function (response) {
			if (response.clearMessages) {
				//remove all sent messages we have!
				messages.clear();
				messagesAndUpdates.clear();
				sortedTopicUpdates.clear();
				//messages.join(unsentMessages);
				//dataMessages.join(unsentMessages.map(:data));
			}

			return response.messages;
		}).map(function (messageData) {
			return Topic.messageFromData(messageData, theTopic);
		}).then(function (messages) {
			theTopic.addMessages(messages, false);
		}).finally(function () {
			this.fetchingMessages = false;
		});

		return this.refetchPromise;
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

	this.messageUnread = function messageUnreadF(mid) {
		return unreadMessages.indexOf(mid) > -1;
	};

	this.getOldestIDs = function () {
		if (messages.length === 0) {
			return {
				topicID: theTopic.getID(),
				oldestID: 0
			}
		} else {
			return {
				topicID: messages[0].getTopicID(),
				oldestID: messages[0].getServerID()
			}
		}
	};

	this.getHash = function getHashF() {
		return meta.getHash();
	};

	this.getID = function getIDF() {
		return h.parseDecimal(data.topicid);
	};

	this.getTime = function () {
		if (data.newestTime) {
			return data.newestTime
		}

		if (data.createServerTime) {
			return data.createServerTime
		}

		return this.getSecuredData().metaAttr("createTime");
	};

	this.getKey = function getKeyF() {
		return meta.metaAttr("_key");
	};

	this.wasReadOnOtherClient = function () {
		setUnread([]);
	};

	this.getLatestTopicUpdate = function () {
		return socket.definitlyEmit("messages.getLatestTopicUpdate", {
			topicID: this.getID()
		}).bind(this).then(function (response) {
			if (response.topicUpdate) {
				return this._addTopicUpdates([response.topicUpdate]);
			}
		});
	};

	this.setTitle = function (title) {
		return this.getLatestTopicUpdate().bind(this).then(function (previousTopicUpdate) {
			return TopicTitleUpdate.create(this, previousTopicUpdate, title);
		}).then(function (topicUpdate) {
			return this._addTopicUpdates([topicUpdate]);
		});
	};

	this.markRead = function markMessagesRead(cb) {
		if (!windowService.isVisible) {
			windowService.listenOnce(function () {
				theTopic.markRead(cb);
			}, "visible");
			return;
		}

		var unreadLength = unreadMessages.length;

		setUnread([]);

		if (unreadLength === 0) {
			return;
		}

		var messageTime = messages[messages.length - 1].getTime();

		return socket.definitlyEmit("messages.markRead", {
			topicid: theTopic.getID(),
			beforeTime: messageTime + 1
		}).then(function (data) {
			setUnread(data.unread);
		}).nodeify(cb);
	};

	function addMessagesToList(messagesToAdd) {
		messagesToAdd = messagesToAdd.filter(function (message) {
			return messages.indexOf(message) === -1;
		});

		messages.join(messagesToAdd);
		messagesAndUpdates.join(messagesToAdd);

		theTopic.data.latestMessage = messages[messages.length - 1];
	}

	this.getMessages = function () {
		return messages
	}

	this.getTopicUpdates = function () {
		return sortedTopicUpdates
	}

	this.getSentMessages = function () {
		return messages.filter(function (m) {
			return m.hasBeenSent();
		});
	};

	this.getNotSentMessages = function () {
		return messages.filter(function (m) {
			return !m.hasBeenSent();
		});
	};

	this.getNewest = function () {
		var sentMessages = this.getSentMessages();
		return sentMessages[sentMessages.length - 1];
	};

	this.sendUnsentMessage = function (messageData, files) {
		var images = files.map(function (file) {
			return new ImageUpload(file);
		});

		return this.sendMessage(messageData.message, images, messageData.id);
	};

	this.sendMessage = function (message, images, id) {
		var messageObject = new Message(this, message, images, id);
		messagesByID[messageObject.getID()] = messageObject;
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
						topicID: this.getID(),
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

	this.getUnreadCount = function () {
		return unreadMessages.length
	}

	this.ensureTopicChain = function (predecessor) {
		var predecessorID = this.getPredecessorID()

		if (predecessorID === predecessor) {
			return
		}

		if (!predecessorID || !topics[predecessorID]) {
			throw new Error()
		}

		topics[predecessorID].ensureTopicChain(predecessor)
	}

	this.addMessages = function (messages, addUnread) {
		messages.forEach(function (message) {
			var id = message.getID();
			data.newestTime = Math.max(message.getTime(), data.newestTime || 0);

			if (message.getTopicID() !== this.getID()) {
				this.ensureTopicChain(message.getTopicID())
			} else {
				message.verifyParent(theTopic);
			}

			if (addUnread && !theTopic.messageUnread(id) && !message.isOwn()) {
				setUnread(unreadMessages.concat([id]));
			}

			message.unread = theTopic.messageUnread(id);
		}, this);

		addMessagesToList(messages);

		theTopic.notify(messages, "addMessages");

		topicArray.resort();

		if (theTopic.data.latestMessage && theTopic.data.latestMessage.isOwn()) {
			this.markRead();
		}
	};

	this.addMessage = function addMessageF(message, addUnread) {
		this.addMessages([message], addUnread);
	};

	this.setIgnoreAsLastTopic = function (val) {
		this._ignoreAsLastTopic = val;
	};

	this.getIgnoreAsLastTopic = function () {
		return this._ignoreAsLastTopic;
	};

	this.verify = function(cb) {
		return Bluebird.try(function () {
			return userService.get(meta.metaAttr("creator"));
		}).then(function (creator) {
			if (creator.isNotExistingUser()) {
				theTopic.data.disabled = true;
				return false;
			}

			return meta.verify(creator.getSignKey()).thenReturn(true);
		}).then(function (addEncryptionIdentifier) {
			if (addEncryptionIdentifier) {
				keyStore.security.addEncryptionIdentifier(meta.metaAttr("_key"));
			}
		}).nodeify(cb);
	};

	this.loadReceiverNames = function loadRNF(cb) {
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

			theTopic.data.partnersDisplay = partners.slice(0, displayCount);
			theTopic.data.partners = partners
			theTopic.data.receivers = receiverObjects

			theTopic.data.addedReceivers = addedReceivers

			if (partners.length > displayCount) {
				theTopic.data.remainingUser = partners.length - displayCount;

				var i = 0;
				for (i = displayCount; i < partners.length; i += 1) {
					theTopic.data.remainingUserTitle += partners[i].name;
					if (i < partners.length - 1) {
						theTopic.data.remainingUserTitle += ", ";
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
			return this._addTopicUpdates(data.latestTopicUpdates);
		}).then(function () {
			var predecessorID = this.getPredecessorID()
			var predecessor = topics[predecessorID]

			if (predecessorID && predecessor) {
				predecessor.setSuccessor(this.getID())

				this.addMessages(predecessor.getMessages())
				// TODO: this._addTopicUpdates(predecessor.getTopicUpdates())
			}

			this.data.verified = true;
		})
	};

	this.findSuccessor = function () {
		Object.keys(topics).forEach(function (topicID) {
			var topic = topics[topicID]

			if (topic.data.verified && topic.getPredecessorID() === this.getID()) {
				topic.getSecuredData().checkParent(this.getSecuredData())
				this.setSuccessor(topic.getID());
			}
		}, this)
	}

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
				throw new Error("Not an admin of this topic")
			}

			return this.getSuccessor().bind(this).then(function (successor) {
				if (successor) {
					throw new Error("TODO: Topic has a successor. Redirecting and try again?")
				}

				return Topic.createRawData(receivers, this, extraMeta)
			}).then(function (topicData) {
				if (!canReadOldMessages) {
					return topicData
				}

				// TODO:  encrypt this topics key with new topics key

				throw new Error("not yet implemented")
			}).then(function (topicData) {
				var topic = new Topic({
					meta: topicData.topic,
					unread: []
				});

				var messageMeta = {
					createTime: new Date().getTime(),
					hidden: true
				};

				return Bluebird.all([
					Message.createRawData(topic, UPDATE_WHISPEER_OLD_CHAT, messageMeta),
					Message.createRawData(this, UPDATE_WHISPEER_NEW_CHAT, messageMeta),
				]).spread(function (oldMessage, newMessage) {
					topicData.oldChatMessage = oldMessage
					topicData.newChatMessage = newMessage
					return topicData
				})
			}).then(function (topicData) {
				return socket.emit("messages.topic.createSuccessor", {
					topicID: this.getID(),
					successor: topicData.topic,
					oldChatMessage: topicData.oldChatMessage,
					newChatMessage: topicData.newChatMessage,
					keys: topicData.keys,
					receiverKeys: topicData.receiverKeys
				})
			}).then(function (response) {
				return Topic.fromData(response.successorTopic)
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

			return Topic.get(this.getPredecessorID(), true).catch(function (err) {
				console.log(err)
				return null
			}, socket.errors.Server)
		}

		this.setSuccessor = function (successorID) {
			this.successorID = successorID

			console.warn("Set successor of topic " , this.getID(), " succ: ", successorID)

			topicArray.remove(this.data)

			this.notify({ successorID: successorID }, "successor")
		}

		this.hasKnownSuccessor = function () {
			return !!this.successorID
		}

		this.getLoadedSuccessor = function () {
			if (!this.hasKnownSuccessor()) {
				return
			}

			return topics[this.successorID]
		}

		this.getSuccessor = function () {
			if (this.sucessorID) {
				return Topic.get(this.sucessorID)
			}

			return socket.emit("messages.topic.successor", { topicID: this.getID() }).bind(this).then(function (response) {
				if (!response.topic) {
					return
				}

				return Topic.fromData(response.topic).then(function (successorTopic) {
					if (successorTopic.getPredecessorID() !== this.getID()) {
						throw new Error("server returned invalid successor topic")
					}

					return successorTopic
				})
			})
		}

	this.loadInitialMessages = function loadInitialMessages(cb) {
		return Bluebird.try(function () {
			if (loadInitial) {
				loadInitial = false;
				return theTopic.loadMoreMessages(cb, 19);
			}
		}).nodeify(cb);
	};

	this.loadMoreMessages = function(cb, max) {
		var loadMore = new Date().getTime();
		var remaining = 0;

		if (theTopic.data.remaining === 0) {
			return Bluebird.resolve().nodeify(cb);
		}

		var requestIDs = theTopic.getOldestIDs()

		return socket.emit("messages.getTopicMessages", {
			topicid: requestIDs.topicID,
			afterMessage: requestIDs.oldestID,
			maximum: max,
			includePredecessors: true
		}).bind(this).then(function (data) {
			topicDebug("Message server took: " + (new Date().getTime() - loadMore));

			remaining = data.remaining;

			if (data.topicUpdates) {
				this._addTopicUpdates(data.topicUpdates);
			}

			var messages = data.messages || [];

			return Bluebird.all(messages.map(function (messageData) {
				return Topic.messageFromData(messageData, theTopic);
			}));
		}).then(function (messages) {
			theTopic.addMessages(messages, false);

			theTopic.data.remaining = remaining;

			topicDebug("Message loading took: " + (new Date().getTime() - loadMore));
		}).nodeify(cb);
		//load more messages and decrypt them.
	};

	this.loadNewest = function() {
		if (!this.data.verified) {
			throw new Error("topic needs to be verified first")
		}

		if (!data.newest || this.data.loaded) {
			this.data.loaded = true;
			return Bluebird.resolve()
		}

		return Bluebird.try(function () {
			return Topic.messageFromData(data.newest, theTopic);
		}).then(function (message) {
			theTopic.addMessage(message, false);
			theTopic.data.loaded = true;
		})
	};

	Observer.extend(theTopic);
};

Topic.multipleFromData = function (topicsData) {
	return Bluebird.resolve(topicsData).map(function (topicData) {
		return Topic.createTopicAndAdd(topicData);
	}).map(function (topic) {
		return Topic.loadTopic(topic).then(function () {
			return topic.loadNewest()
		}).thenReturn(topic)
	})
};

Topic.loadInChunks = function (topicsData, count) {
	var load = topicsData.slice(0, count)
	var remaining = topicsData.slice(count)

	if (topicsData.length === 0) {
		return Bluebird.resolve([])
	}

	return Topic.multipleFromData(load).then(function (topics) {
		return Topic.loadInChunks(remaining, count).then(function (otherTopics) {
			return topics.concat(otherTopics)
		})
	})
}

Topic.createTopicAndAdd = function (topicData) {
	var topic = new Topic(topicData);

	var id = topic.getID();

	if (topics[id]) {
		return topics[id];
	}

	topic.findSuccessor()

	topics[id] = topic

	if (!topic.hasKnownSuccessor()) {
		topicArray.push(topic.data);
	}

	return topic;
};

Topic.loadTopic = function (topic) {
	if (topic.data.verified) {
		return Bluebird.resolve(topic);
	}

	return topic.loadAllData().then(function () {
		topicDebug("Topic loaded (" + topic.getID() + "):" + (new Date().getTime() - startup));
	}).thenReturn(topic)
};

Topic.fromData = function (topicData, noAutoLoad) {
	return Bluebird.resolve(topicData).then(function (topicData) {
		var topic = Topic.createTopicAndAdd(topicData);
		return Topic.loadTopic(topic);
	}).then(function (topic) {
		if (!noAutoLoad) {
			return topic.loadNewest().thenReturn(topic)
		}

		return topic
	});
};

Topic.loadTopicChain = function (newTopic, oldTopic) {
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

		return Topic.loadTopicChain(pred, oldTopic)
	})
}

Topic.messageFromData = function (data, topicToAdd) {
	var id = Message.idFromData(data).messageID

	if (messagesByID[id]) {
		return Bluebird.resolve(messagesByID[id])
	}

	messagesByID[id] = Bluebird.try(function () {
		return Topic.get(data.meta.topicid, true);
	}).then(function (theTopic) {
		if (topicToAdd && theTopic.getID() !== topicToAdd.getID()) {
			return Topic.loadTopicChain(topicToAdd, theTopic).thenReturn(theTopic)
		}

		return theTopic
	}).then(function (theTopic) {
		var messageToAdd = new Message(theTopic, data);
		messagesByID[messageToAdd.getID()] = messageToAdd;

		messageToAdd.verifyParent(theTopic);
		return messageToAdd.loadFullData().thenReturn(messageToAdd);
	})

	return messagesByID[id]
};

Topic.getLoadedTopic = function (topicid) {
	return topics[topicid]
}

Topic.get = function (topicid, noAutoLoadNewest) {
	if (topics[topicid]) {
		return Bluebird.resolve(topics[topicid])
	}

	return initService.awaitLoading().then(function () {
		return socket.definitlyEmit("messages.getTopic", {
			topicid: topicid
		});
	}).then(function (data) {
		return Topic.fromData(data.topic, noAutoLoadNewest);
	}).then(function (theTopic) {
		theTopic.setIgnoreAsLastTopic(true);
		return theTopic;
	})
};

Topic.createRawData = function (receiver, predecessorTopic, extraMeta) {
	var receiverObjects, topicKey, topicData;
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
		topicKey = key;

		//encrypt topic key with own mainkey
		return keyStore.sym.symEncryptKey(topicKey, userService.getown().getMainKey());
	}).then(function () {
		//encrypt topic key for receiver
		return Bluebird.all(receiverObjects.map(function (receiverObject) {
			var crypt = receiverObject.getCryptKey();
			return keyStore.sym.asymEncryptKey(topicKey, crypt);
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

		// topic hashable data.
		var topicMeta = Object.assign({
			createTime: new Date().getTime(),
			receiver: receiverIDs,
			creator: userService.getown().getID()
		}, extraMeta || {});

		if (predecessorTopic) {
			topicMeta.predecessor = predecessorTopic.getID()
		}

		//create data
		topicData = {
			keys: cryptKeysData.concat([keyStore.upload.getKey(topicKey)]),
			receiverKeys: receiverKeys
		};

		var secured = SecuredData.createRaw({}, topicMeta, { type: "topic" })

		if (predecessorTopic) {
			secured.setParent(predecessorTopic.getSecuredData())
		}

		return secured.signAndEncrypt(userService.getown().getSignKey(), topicKey);
	}).then(function (tData) {
		topicData.topic = tData.meta;

		return topicData;
	})
};

Topic.reset = function () {
	messagesByID = {};
	topics = {};
	topicArray = sortedSet(sortObjGetTimeInv);
};

Topic.all = function () {
	return topicArray
};

Topic.createData = function (receiver, message, images, cb) {
	var imagePreparation = Bluebird.resolve(images).map(function (image) {
		return image.prepare();
	});

	function uploadImages(topicKey) {
		return Bluebird.all(images.map(function (image) {
			return image.upload(topicKey);
		}));
	}

	var resultPromise = Bluebird.all([Topic.createRawData(receiver), imagePreparation]).spread(function (topicData, imagesMeta) {
		var topic = new Topic({
			meta: topicData.topic,
			unread: []
		});

		var messageMeta = {
			createTime: new Date().getTime(),
			images: imagesMeta
		};

		return Bluebird.all([
			topicData,
			Message.createRawData(topic, message, messageMeta),
			uploadImages(topic.getKey())
		]);
	}).spread(function (topicData, messageData, imageKeys) {
		imageKeys = h.array.flatten(imageKeys);
		messageData.imageKeys = imageKeys.map(keyStore.upload.getKey);

		topicData.message = messageData;

		return topicData;
	});

	return resultPromise.nodeify(cb);
};

Observer.extend(Topic);

module.exports = Topic;
