const h = require("whispeerHelper");
const validator = require("validation/validator");
import Observer from "../asset/observer"
const SecuredData = require("asset/securedDataWithMetaData");
import * as Bluebird from "bluebird"
const debug = require("debug");

const userService = require("user/userService");
import socket from "../services/socket.service"
const keyStore = require("services/keyStore.service").default;
const sessionService = require("services/session.service").default;
const initService = require("services/initService");

import Cache from "../services/Cache.ts";

const Message = require("models/message");

const ImageUpload = require("services/imageUploadService");

const debugName = "whispeer:chunk";
const chunkDebug = debug(debugName);

const chunksByID = {}, chunksLoadingByID = {};

declare const startup: number

class Chunk extends Observer {
	private meta
	private receiver
	private data
	private server: { id: number, createTime: number }
	private _loadReceiverNamesPromise: any
	private successorID: number

	constructor(data) {
		super()

		var err = validator.validate("topic", data.meta);
		if (err) {
			throw err;
		}

		data.meta.receiver.sort();

		this.meta = SecuredData.load(undefined, data.meta, {
			type: "topic", // Keep topic for now until lots of clients have picked up the change
			alternativeType: "chatChunk" // Allow for chatChunk already
		});

		this.server = data.server

		this.receiver = this.meta.metaAttr("receiver");

		this.data = {
			loaded: false,
			verified: false,

			partners: [],
			partnersDisplay: [],

			remainingUser: "",
			remainingUserTitle: "",

			id: data.server.chunkID,
			type: (this.receiver.length <= 2 ? "peerChat" : "groupChat"),
			obj: this
		};
	}

	awaitEarlierSend = (time) => {
		/*var previousMessages = this.getNotSentMessages().filter(function (message) {
			return message.getTime() < time;
		});

		if (previousMessages.length === 0) {
			return Bluebird.resolve();
		}

		return previousMessages[previousMessages.length - 1].getSendPromise();*/
	}

	getSecuredData = () => {
		return this.meta;
	}

	getHash = () => {
		return this.meta.getHash();
	}

	getID = () => {
		return h.parseDecimal(this.server.id);
	};

	getTime = () => {
		if (this.server.createTime) {
			return this.server.createTime
		}

		return this.getSecuredData().metaAttr("createTime");
	};

	getKey = () => {
		return this.meta.metaAttr("_key");
	};

	sendUnsentMessage = (messageData, files) => {
		var images = files.map(function (file) {
			return new ImageUpload(file);
		});

		return this.sendMessage(messageData.message, images, messageData.id);
	};

	sendMessage = (message, images, id) => {
		var messageObject = new Message(this, message, images, id);
		// messagesByID[messageObject.getID()] = messageObject;

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

	ensureChunkChain = (predecessor) => {
		var predecessorID = this.getPredecessorID()

		if (predecessorID === predecessor) {
			return
		}

		if (!predecessorID || !chunksByID[predecessorID]) {
			throw new Error()
		}

		chunksByID[predecessorID].ensureChunkChain(predecessor)
	}

	verify = () => {
		return Bluebird.try(() => {
			return userService.get(this.meta.metaAttr("creator"));
		}).then((creator) => {
			if (creator.isNotExistingUser()) {
				this.data.disabled = true;
				return false;
			}

			return this.meta.verify(creator.getSignKey()).thenReturn(true);
		}).then(function (addEncryptionIdentifier) {
			if (addEncryptionIdentifier) {
				keyStore.security.addEncryptionIdentifier(this.meta.metaAttr("_key"));
			}
		})
	};

	loadReceiverNames = () => {
		if (this._loadReceiverNamesPromise) {
			return this._loadReceiverNamesPromise
		}

		this._loadReceiverNamesPromise = Bluebird.try(() => {
			return userService.getMultipleFormatted(this.receiver)
		}).then((receiverObjects) => {
			var partners = receiverObjects.filter((receiverObject) => {
				return !receiverObject.user.isOwn() || receiverObjects.length === 1
			});

			var maxDisplay = 3;
			var displayCount = (partners.length > maxDisplay) ? 2 : partners.length;

			this.data.partnersDisplay = partners.slice(0, displayCount);
			this.data.partners = partners
			this.data.receivers = receiverObjects

			if (partners.length > displayCount) {
				this.data.remainingUser = partners.length - displayCount;

				var i = 0;
				for (i = displayCount; i < partners.length; i += 1) {
					this.data.remainingUserTitle += partners[i].name;
					if (i < partners.length - 1) {
						this.data.remainingUserTitle += ", ";
					}
				}
			}
		})

		return this._loadReceiverNamesPromise
	};

	getReceiver = () => {
		return this.receiver
	}

	load = () => {
		return Bluebird.all([
			this.verify(),
			this.loadReceiverNames(),
		]).then(() => {
			var predecessorID = this.getPredecessorID()
			var predecessor = chunksByID[predecessorID]

			if (predecessorID && predecessor) {
				predecessor.setSuccessor(this.getID())
			}

			this.data.verified = true;
		})
	};

	isAdmin = (user) => {
		return this.getCreator() === user.getID()
	}

	amIAdmin = () => {
		return this.isAdmin(userService.getown())
	}

	getCreator = () => {
		return h.parseDecimal(this.meta.metaAttr("creator"))
	}

	addReceivers = (newReceiverIDs, canReadOldMessages) => {
		var oldReceivers = this.getReceiver()

		return this.setReceivers(oldReceivers.concat(newReceiverIDs), {
			addedReceivers: [].concat(newReceiverIDs)
		}, canReadOldMessages)
	}

	setReceivers = (receivers, extraMeta, canReadOldMessages) => {
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

	hasPredecessor = () => {
		return !!this.meta.metaAttr("predecessor")
	}

	getPredecessorID = () => {
		if (!this.hasPredecessor()) {
			return null
		}

		return h.parseDecimal(this.meta.metaAttr("predecessor"))
	}

	getPredecessor = () => {
		if (!this.hasPredecessor()) {
			return null
		}

		return Chunk.get(this.getPredecessorID()).catch(function (err) {
			console.log(err)
			return null
		}, socket.errors.Server)
	}

	setSuccessor = (successorID) => {
		this.successorID = successorID

		console.warn("Set successor of topic " , this.getID(), " succ: ", successorID)

		this.notify({ successorID: successorID }, "successor")
	}

	hasKnownSuccessor = () => {
		return !!this.successorID
	}

	getLoadedSuccessor = () => {
		if (!this.hasKnownSuccessor()) {
			return
		}

		return chunksByID[this.successorID]
	}

	getSuccessor = () => {
		if (this.successorID) {
			return Chunk.get(this.successorID)
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


	static load(chunkData) {
		var chunkID = chunkData.server.id

		if (chunksByID[chunkID]) {
			return chunksByID[chunkID]
		}

		if (chunksLoadingByID[chunkID]) {
			return chunksLoadingByID[chunkID]
		}

		var chunk = new Chunk(chunkData)

		chunksLoadingByID[chunkID] = chunk.load().thenReturn(chunk)
	}

	static multipleFromData(topicsData) {
		return Bluebird.resolve(topicsData).map(function (topicData) {
			return Chunk.createTopicAndAdd(topicData);
		}).map(function (topic) {
			return Chunk.loadTopic(topic).then(function () {
				return topic.loadNewest()
			}).thenReturn(topic)
		})
	};

	static loadInChunks(topicsData, count) {
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

	static createTopicAndAdd(chunkData) {
		var chunkID = h.parseDecimal(chunkData.topicid)

		if (chunksByID[chunkID]) {
			return chunksByID[chunkID]
		}

		var chunk = new Chunk(chunkData);

		// chunk.findSuccessor()

		chunksByID[chunkID] = chunk

		delete chunksLoadingByID[chunkID]

		return chunk;
	};

	static loadTopic(topic) {
		if (topic.data.verified) {
			return Bluebird.resolve(topic);
		}

		return topic.load().then(function () {
			chunkDebug("Topic loaded (" + topic.getID() + "):" + (new Date().getTime() - startup));
		}).thenReturn(topic)
	};

	static fromData(topicData, noAutoLoad = false) {
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

	static loadTopicChain(newTopic, oldTopic) {
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

	static getLoadedTopic(topicid) {
		return chunksByID[topicid]
	}

	static get(chunkID) {
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

	static createRawData(receiver, predecessorChunk = null, extraMeta = {}) {
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

			const predecessorInfo = predecessorChunk ? {
				predecessor: predecessorChunk.getID()
			} : {}

			// chunk signable data.
			var chunkMeta = {
				createTime: new Date().getTime(),
				receiver: receiverIDs,
				creator: userService.getown().getID(),
				...extraMeta,
				...predecessorInfo
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
				return {
					...chunkData,
					chunk: cData.meta
				}
			})
		})
	};

	static createData(receiver, message, images, cb) {
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
}

Observer.extend(Chunk);

module.exports = Chunk;
