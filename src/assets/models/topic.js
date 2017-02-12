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
var TopicUpdate = require("models/topicUpdate");

var ImageUpload = require("services/imageUploadService");

var windowService = require("services/windowService");


var debugName = "whispeer:topic";
var topicDebug = debug(debugName);

function sortGetTime(a, b) {
	return (a.getTime() - b.getTime());
}

function sortObjGetTimeInv(a, b) {
	return (b.obj.getTime() - a.obj.getTime());
}

function sortUnreadOrTime(a, b) {
	if (a.unread && !b.unread) {
		return -1;
	}

	if (!a.unread && b.unread) {
		return 1;
	}

	return sortObjGetTimeInv(a, b);
}

var topics = {}, messagesByID = {};
var topicArray = sortedSet(sortUnreadOrTime);

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

	this.data = {
		loaded: false,
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

			var topicUpdateObject = new TopicUpdate(topicUpdateData);

			topicUpdatesById[topicUpdateData.id] = topicUpdateObject;

			return topicUpdateObject.load().thenReturn(topicUpdateObject);
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
			return;
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
		var oldest = sentMessages.shift();
		var newest = sentMessages.pop();

		var request = {
			topicid: this.getID(),
			oldest: oldest,
			newest: newest,
			inBetween: sentMessages,
			maximum: 20,
			messageCountOnFlush: 10
		};

		return socket.emit("messages.refetch", request).bind(this).then(function (response) {
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
			return Topic.messageFromData(messageData);
		}).then(function (messages) {
			theTopic.addMessages(messages, false);
		}).finally(function () {
			this.fetchingMessages = false;
		});
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

	this.getOldestID = function getOldestIDF() {
		if (messages.length === 0) {
			return 0;
		} else {
			return messages[0].getServerID();
		}
	};

	this.getHash = function getHashF() {
		return meta.getHash();
	};

	this.getID = function getIDF() {
		return h.parseDecimal(data.topicid);
	};

	this.getTime = function getTimeF() {
		return data.newestTime;
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
			return TopicUpdate.create(this, {
				title: title,
				previousTopicUpdate: previousTopicUpdate
			});
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
			messageSendCache.store(
				messageObject.getID(),
				{
					topicID: this.getID(),
					id: messageObject.getID(),
					message: message
				},
				images.map(function (image) {
					return image.getFile();
				})
			);
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

	this.addMessages = function (messages, addUnread) {
		messages.forEach(function (message) {
			var id = message.getID();
			data.newestTime = Math.max(message.getTime(), data.newestTime || 0);

			message.verifyParent(theTopic);

			if (addUnread && !theTopic.messageUnread(id) && !message.isOwn()) {
				setUnread(unreadMessages.concat([id]));
			}

			message.unread = theTopic.messageUnread(id);
		});

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
		return Bluebird.try(function () {
			return userService.getMultipleFormatted(receiver);
		}).then(function (receiverObjects) {
			var partners = theTopic.data.partners;

			if (partners.length > 0) {
				return;
			}

			receiverObjects.forEach(function (receiverObject) {
				if (!receiverObject.user.isOwn() || receiverObjects.length === 1) {
					partners.push(receiverObject);
				}
			});

			var maxDisplay = 3;
			var displayCount = (partners.length > maxDisplay) ? 2 : partners.length;
			theTopic.data.partnersDisplay = partners.slice(0, displayCount);
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
	};

	this.getReceiver = function () {
		return receiver;
	};

	this.loadAllData = function loadAllDataF(cb) {
		return Bluebird.resolve().bind(this).then(function () {
			return this.verify();
		}).then(function () {
			return this.loadNewest();
		}).then(function () {
			return this.loadReceiverNames();
		}).then(function () {
			return this._addTopicUpdates(data.latestTopicUpdates);
		}).then(function () {
			this.data.loaded = true;
		}).nodeify(cb);
	};

	this.loadInitialMessages = function loadInitialMessages(cb) {
		return Bluebird.try(function () {
			if (loadInitial) {
				loadInitial = false;
				return theTopic.loadMoreMessages(cb, 19);
			}
		}).nodeify(cb);
	};

	this.loadMoreMessages = function loadMoreMessagesF(cb, max) {
		var loadMore = new Date().getTime();
		var remaining = 0;

		if (theTopic.data.remaining === 0) {
			return Bluebird.resolve().nodeify(cb);
		}

		return socket.emit("messages.getTopicMessages", {
			topicid: theTopic.getID(),
			afterMessage: theTopic.getOldestID(),
			maximum: max
		}).bind(this).then(function (data) {
			topicDebug("Message server took: " + (new Date().getTime() - loadMore));

			remaining = data.remaining;

			if (data.topicUpdates) {
				this._addTopicUpdates(data.topicUpdates);
			}

			var messages = data.messages || [];

			return Bluebird.all(messages.map(function (messageData) {
				return Topic.messageFromData(messageData);
			}));
		}).then(function (messages) {
			theTopic.addMessages(messages, false);

			theTopic.data.remaining = remaining;

			topicDebug("Message loading took: " + (new Date().getTime() - loadMore));
		}).nodeify(cb);
		//load more messages and decrypt them.
	};

	this.loadNewest = function(cb) {
		if (!data.newest) {
			return Bluebird.resolve().nodeify(cb);
		}

		return Bluebird.try(function () {
			return Topic.messageFromData(data.newest);
		}).then(function (message) {
			theTopic.addMessage(message, false);
		}).nodeify(cb);
	};

	Observer.extend(theTopic);
};

Topic.multipleFromData = function (topicsData) {
	return Bluebird.resolve(topicsData).map(function (topicData) {
		return Topic.createTopicAndAdd(topicData);
	}).map(function (topic) {
		return Topic.loadTopic(topic);
	}).then(function (topics) {
		return topics;
	});
};

Topic.createTopicAndAdd = function (topicData) {
	var topic = new Topic(topicData);

	var id = topic.getID();

	if (topics[id]) {
		return topics[id];
	}

	topics[id] = topic;

	topicArray.push(topic.data);

	return topic;
};

Topic.loadTopic = function (topic) {
	if (topic.data.loaded) {
		return Bluebird.resolve(topic);
	}

	var promise = Bluebird.promisify(topic.loadAllData.bind(topic))().thenReturn(topic);

	promise.then(function (topic) {
		topicDebug("Topic loaded (" + topic.getID() + "):" + (new Date().getTime() - startup));
	});

	return promise;
};

Topic.fromData = function (topicData) {
	return Bluebird.resolve(topicData).then(function (topicData) {
		var topic = Topic.createTopicAndAdd(topicData);
		return Topic.loadTopic(topic);
	});
};

Topic.messageFromData = function (data, cb) {
	var messageToAdd = new Message(data), theTopic;
	var id = messageToAdd.getID();

	cb = cb || h.nop;

	if (messagesByID[id]) {
		return Bluebird.resolve(messagesByID[id]).nodeify(cb);
	}

	messagesByID[id] = messageToAdd;

	return Bluebird.try(function () {
		return Topic.get(messageToAdd.getTopicID());
	}).then(function (_theTopic) {
		theTopic = _theTopic;

		messageToAdd.verifyParent(theTopic);
		return messageToAdd.loadFullData().thenReturn(messageToAdd);
	}).nodeify(cb);
};

Topic.get = function (topicid, cb) {
	if (topics[topicid]) {
		return Bluebird.resolve(topics[topicid]).nodeify(cb);
	}

	return initService.awaitLoading().then(function () {
		return socket.definitlyEmit("messages.getTopic", {
			topicid: topicid
		});
	}).then(function (data) {
		return Topic.fromData(data.topic);
	}).then(function (theTopic) {
		theTopic.setIgnoreAsLastTopic(true);
		return theTopic;
	}).nodeify(cb);
};

Topic.createRawData = function (receiver, cb) {
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
		var topicMeta = {
			createTime: new Date().getTime(),
			receiver: receiverIDs,
			creator: userService.getown().getID()
		};

		//create data
		topicData = {
			keys: cryptKeysData.concat([keyStore.upload.getKey(topicKey)]),
			receiverKeys: receiverKeys
		};

		return SecuredData.createAsync({}, topicMeta, { type: "topic" }, userService.getown().getSignKey(), topicKey);
	}).then(function (tData) {
		topicData.topic = tData.meta;

		return topicData;
	}).nodeify(cb);
};

Topic.reset = function () {
	messagesByID = {};
	topics = {};
	topicArray = sortedSet(sortUnreadOrTime);
};

Topic.all = function () {
	return topicArray;
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

	var createRawTopicData = Bluebird.promisify(Topic.createRawData.bind(Topic));
	var createRawMessageData = Bluebird.promisify(Message.createRawData.bind(Message));

	var resultPromise = Bluebird.all([createRawTopicData(receiver), imagePreparation]).spread(function (topicData, imagesMeta) {
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
			createRawMessageData(topic, message, messageMeta),
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
