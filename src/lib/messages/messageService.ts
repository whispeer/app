/**
* MessageService
**/

import h from "../helper/helper";
var Observer = require("asset/observer");
import * as Bluebird from "bluebird";

import errorService from "services/error.service"
import socket from "../services/socket.service"
import Cache from "../services/Cache"

var sessionService = require("services/session.service");
var initService = require("services/initService");

import ChunkLoader, { Chunk } from "../messages/chatChunk"
import ChatLoader from "../messages/chat"

var messageService;

let chatIDs

messageService = {
	addSocketMessage: function (messageData) {
		if (!messageData) {
			return Bluebird.resolve()
		}
		/*var messageToAdd;

		return Bluebird.try(function () {
			return Chunk.messageFromData(messageData);
		}).then(function (_messageToAdd) {
			messageToAdd = _messageToAdd;
			return Chunk.get(messageToAdd.getTopicID());
		}).then(function (theTopic) {
			theTopic.addMessage(messageToAdd, true);
			messageService.notify(messageToAdd, "message");

			return theTopic.refetchMessages();
		}).catch(errorService.criticalError);*/
	},
	loadChatIDs: function () {
		return socket.definitlyEmit("chat.getAllIDs", {}).then(function (response) {
			chatIDs = response.chatIDs
			return chatIDs
		});
	},
	getChatIDs: function (refresh: boolean = false) {
		return chatIDs || []
	},
	loadMoreChats: h.cacheUntilSettled(() => {
		return initService.awaitLoading().then(function () {
			if (chatIDs) {
				return Bluebird.resolve()
			}

			return messageService.loadChatIDs()
		}).then(function () {
			const unloadedChatIDs = messageService.getChatIDs().filter(function (chatID) {
				return !ChatLoader.isLoaded(chatID)
			})

			if (unloadedChatIDs.length === 0) {
				messageService.allChatsLoaded = true
			}

			return socket.definitlyEmit("chat.getMultiple", {
				ids: unloadedChatIDs.slice(0, 20)
			})
		}).then(function (latest) {
			return Bluebird.all(latest.chats.map(function (chatData) {
				return ChatLoader.load(chatData, chatData.chat.id)
			}))
		}).catch(errorService.criticalError);
	}),
	sendUnsentMessages: function () {
		var messageSendCache = new Cache("messageSend", { maxEntries: -1, maxBlobSize: -1 });

		return Bluebird.resolve(messageSendCache.all().toArray()).map(function (unsentMessage: any) {
			var data = JSON.parse(unsentMessage.data);

			return messageService.getChat(data.topicID).then(function (chat) {
				return chat.sendUnsentMessage(data, unsentMessage.blobs);
			});
		});
	},
	getChat: function (chatID, cb) {
		return Bluebird.try(function () {
			return ChatLoader.get(chatID);
		}).nodeify(cb);
	},
	sendMessageToUserChatIfExists: function(receiver, message, images) {
		return Bluebird.coroutine(function* () {
			const chatid = yield messageService.getUserChat(receiver)

			if (!chatid) {
				return;
			}

			const chat = yield ChatLoader.get(chatid)
			const chunk = yield ChunkLoader.get(chat.getLatestChunk())

			var otherReceiver = chunk.getReceiver().map(h.parseDecimal)

			if (otherReceiver.length > 2) {
				console.log("send to existing user chat failed as more than two users in receiver list")
				return false;
			}

			if (otherReceiver.indexOf(receiver) === -1) {
				console.log("send to existing user chat failed as other user is not in receiver list")
				return false;
			}

			if (otherReceiver.indexOf(sessionService.getUserID()) > -1) {
				console.log("send to existing user chat failed as own user is not in receiver list")
				return false;
			}

			yield messageService.sendMessage(chat, message, images)

			// return chat
		});
	},
	sendNewChat: function (receiver, message, images) {
		return Bluebird.try(function () {
			if (receiver.length === 1) {
				return messageService.sendMessageToUserChatIfExists(receiver, message, images);
			}

			return false;
		}).then(function (chat) {
			if (chat) {
				return chat.getID();
			}

			return Chunk.createData(receiver, message, images).then(function (chunkData) {
				return socket.emit("chat.create", {
					initialChunk: chunkData.chunk,
					firstMessage: chunkData.message,
					receiverKeys: chunkData.receiverKeys,
					keys: chunkData.keys
				});
			}).then(function (response) {
				return ChatLoader.load(response.server.id, response);
			}).then(function (chat) {
				return chat.getID();
			});
		});
	},
	sendMessage: function (chatID, message, images) {
		return Bluebird.resolve(chatID).then(function (chat) {
			if (typeof chat !== "object") {
				return ChatLoader.get(chat);
			} else {
				return chat;
			}
		}).then(function (chat) {
			return chat.sendMessage(message, images);
		});
	},
	getUserChat: function (uid, cb) {
		return initService.awaitLoading().then(function () {
			return socket.definitlyEmit("chat.getChatWithUser", {
				userID: uid
			});
		}).then(function (data) {
			if (data.chatID) {
				return data.chatID;
			}

			return false;
		}).nodeify(cb);
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

function loadUnreadChatIDs() {
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
	loadUnreadChatIDs();
});

initService.listen(function () {
	loadUnreadChatIDs();
	messageService.sendUnsentMessages();
}, "initDone");

export default messageService
