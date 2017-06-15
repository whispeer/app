/**
* MessageService
**/

var h = require("whispeerHelper");
var Observer = require("asset/observer");
import * as Bluebird from "bluebird";

import errorService from "services/error.service"
import socket from "../services/socket.service"
import Cache from "../services/Cache"

var sessionService = require("services/session.service");
var initService = require("services/initService");

var Chunk = require("messages/chatChunk")
import Chat from "../messages/chat"

var messageService;

var activeTopic = 0;

messageService = {
	addSocketMessage: function (messageData) {
		if (!messageData) {
			return Bluebird.resolve()
		}
		var messageToAdd;

		return Bluebird.try(function () {
			return Chunk.messageFromData(messageData);
		}).then(function (_messageToAdd) {
			messageToAdd = _messageToAdd;
			return Chunk.get(messageToAdd.getTopicID());
		}).then(function (theTopic) {
			theTopic.addMessage(messageToAdd, true);
			messageService.notify(messageToAdd, "message");

			return theTopic.refetchMessages();
		}).catch(errorService.criticalError);
	},
	isActiveTopic: function (topicid) {
		return activeTopic === h.parseDecimal(topicid);
	},
	setActiveTopic: function (topicid) {
		activeTopic = h.parseDecimal(topicid);
	},
	getAllChatIDs: (function () {
		var chatIDs

		return function (refresh) {
			if (chatIDs && !refresh) {
				return Bluebird.resolve(chatIDs)
			}

			return socket.definitlyEmit("chat.getAllIDs", {}).then(function (response) {
				chatIDs = response.chatIDs
				return chatIDs
			});
		}
	})(),
	loadMoreChats: (function () {
		var loadingChatsPromise

		return function () {
			if (loadingChatsPromise) {
				return loadingChatsPromise
			}

			loadingChatsPromise = initService.awaitLoading().then(function () {
				return messageService.getAllChatIDs()
			}).then(function (chatIDs) {
				var unloadedChatIDs = chatIDs.filter(function (chatID) {
					return !Chat.isLoaded(chatID)
				})

				if (unloadedChatIDs.length === 0) {
					messageService.allTopicsLoaded = true
				}

				return socket.definitlyEmit("chat.getMultiple", {
					ids: unloadedChatIDs.slice(0, 20)
				})
			}).then(function (latest) {
				return Bluebird.all(latest.chats.map(function (chatData) {
					return Chat.load(chatData.server.id, chatData)
				}))
			}).then(function (topics) {

			}).catch(errorService.criticalError);

			return loadingChatsPromise
		}
	})(),
	sendUnsentMessages: function () {
		var messageSendCache = new Cache("messageSend", { maxEntries: -1, maxBlobSize: -1 });

		return Bluebird.resolve(messageSendCache.all().toArray()).map(function (unsentMessage: any) {
			var data = JSON.parse(unsentMessage.data);

			return messageService.getTopic(data.topicID).then(function (topic) {
				return topic.sendUnsentMessage(data, unsentMessage.blobs);
			});
		});
	},
	getTopic: function (topicid, cb) {
		return Bluebird.try(function () {
			return Chat.get(topicid);
		}).nodeify(cb);
	},
	sendMessageToUserTopicIfExists: function(receiver, message, images) {
		return messageService.getUserTopic(receiver).then(function (topicid) {
			if (!topicid) {
				return;
			}

			return Chat.get(topicid).then(function (topic) {
				var otherReceiver = topic.getReceiver().map(h.parseDecimal);

				if (otherReceiver.length > 2) {
					console.log("send to existing user topic failed as more than two users in receiver list");
					return false;
				}

				if (otherReceiver.indexOf(receiver) === -1) {
					console.log("send to existing user topic failed as other user is not in receiver list");
					return false;
				}

				if (otherReceiver.indexOf(sessionService.getUserID()) > -1) {
					console.log("send to existing user topic failed as own user is not in receiver list");
					return false;
				}

				return messageService.sendMessage(topic, message, images).thenReturn(topic);
			});
		});
	},
	sendNewTopic: function (receiver, message, images) {
		return Bluebird.try(function () {
			if (receiver.length === 1) {
				return messageService.sendMessageToUserTopicIfExists(receiver, message, images);
			}

			return false;
		}).then(function (topic) {
			if (topic) {
				return topic.getID();
			}

			return Chunk.createData(receiver, message, images).then(function (chunkData) {
				return socket.emit("chat.create", {
					initialChunk: chunkData.chunk,
					firstMessage: chunkData.message,
					receiverKeys: chunkData.receiverKeys,
					keys: chunkData.keys
				});
			}).then(function (response) {
				return Chat.load(response.server.id, response);
			}).then(function (topics) {
				return topics[0].getID();
			});
		});
	},
	sendMessage: function (topicID, message, images, cb) {
		var resultPromise = Bluebird.resolve(topicID).then(function (topic) {
			if (typeof topic !== "object") {
				return Chat.get(topic);
			} else {
				return topic;
			}
		}).then(function (topic) {
			return topic.sendMessage(message, images);
		});

		return resultPromise.nodeify(cb);
	},
	getUserTopic: function (uid, cb) {
		return initService.awaitLoading().then(function () {
			return socket.definitlyEmit("chat.getChatWithUser", {
				userID: uid
			});
		}).then(function (data) {
			if (data.topicid) {
				return data.topicid;
			}

			return false;
		}).nodeify(cb);
	},
	data: {
		latestTopics: {
			count: 0,
			loading: false,
			loaded: false,
			data: [] // Topic.all()
		},
		unread: 0
	}
};

Observer.extend(messageService);

socket.channel("message", function (e, data) {
	if (!e) {
		/*if (data.topic) {
			Chat.fromData(data.topic).then(function (topic) {
				if (topic.data.unread) {
					changeReadTopic(topic.getID(), true);
				}

				messageService.addSocketMessage(data.message);
			});
		} else {
			messageService.addSocketMessage(data.message);
		}*/
		// TODO
	} else {
		errorService.criticalError(e);
	}
});

socket.channel("unreadTopics", function (e, data) {
	if (e) {
		return;
	}


});

function loadUnreadTopicIDs() {
	return initService.awaitLoading().then(function () {
		return Bluebird.delay(500);
	}).then(function () {
		return socket.awaitConnection();
	}).then(function () {
		return socket.emit("messages.getUnreadTopicIDs", {});
	}).then(function (data) {
		//TODO: updateUnreadIDs(data.unread);
	});
}

socket.on("connect", function () {
	loadUnreadTopicIDs();
});

initService.listen(function () {
	loadUnreadTopicIDs();
	messageService.sendUnsentMessages();
}, "initDone");

export default messageService
