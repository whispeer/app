import * as Bluebird from 'bluebird';

import socketService from "../services/socket.service"

import ObjectLoader from "../services/objectLoader"

import ChunkLoader, { Chunk } from "./chatChunk"
import MessageLoader, { Message } from "./message"

import h from "../helper/helper"

import Cache from "../services/Cache.ts";

const ImageUpload = require("services/imageUploadService");
const initService = require("services/initService");

let unreadChatIDs = []

const addAfterTime = (arr:timeArray, id: any, time: number) => {
	const firstLaterIndex = arr.findIndex((ele) => ele.time > time)

	return [
		...arr.slice(0, firstLaterIndex),
		{ id, time },
		...arr.slice(firstLaterIndex)
	]
}

type timeArray = {
	id: any,
	time: number
}[]

export class Chat {
	//Sorted IDs
	private messages:timeArray = []
	private chatUpdates:timeArray = []
	private messagesAndUpdates:timeArray = []

	// Unsorted IDs
	private chunkIDs: number[] = []
	private unreadMessageIDs: number[] = []

	private id: number

	private loadingInfo: {
		latestMessageID: number,
		latestChunkID: number
	}

	public newMessage = ""

	constructor({ id, latestMessageID, latestChunkID, unreadMessageIDs }) {
		this.id = id

		this.loadingInfo = {
			latestMessageID: latestMessageID,
			latestChunkID: latestChunkID,
		}

		this.unreadMessageIDs = unreadMessageIDs
	}

	getID = () => {
		return this.id
	}

	isUnread() {
		return unreadChatIDs.indexOf(this.id) > -1
	}

	removeMessageID = (removeID) => {
		this.messages = this.messages.filter(({ id }) => removeID !== id)
		this.messagesAndUpdates = this.messagesAndUpdates.filter(({ id: { id } }) => removeID !== id)
	}

	addMessageID = (id, time) => {
		const alreadyAdded = this.messages.find((message) => message.id === id)

		if (alreadyAdded) {
			return
		}

		this.messages = addAfterTime(this.messages, id, time)
		this.messagesAndUpdates = addAfterTime(this.messagesAndUpdates, { type: "message", id }, time)
	}

	addChatUpdateID = (id, time) => {
		const alreadyAdded = this.chatUpdates.find((chatUpdate) => chatUpdate.id === id)

		if (alreadyAdded) {
			return
		}

		this.chatUpdates = addAfterTime(this.chatUpdates, id, time)
		this.messagesAndUpdates = addAfterTime(this.messagesAndUpdates, { type: "chatUpdate", id }, time)
	}

	verifyMessageAssociations = (message) => {
		return Bluebird.all([
			ChunkLoader.get(message.getChunkID()),
			ChunkLoader.get(h.array.last(this.chunkIDs)),
		]).then(([messageChunk, latestChunk]) => {
			message.verifyParent(messageChunk)

			return Chunk.loadChunkChain(latestChunk, messageChunk).thenReturn([latestChunk, messageChunk])
		}).then(([latestChunk, messageChunk]) => {
			latestChunk.ensureChunkChain(messageChunk)
		})
	}

	load = h.cacheResult<Bluebird<any>>(() => {
		return Bluebird.all([
			MessageLoader.get(this.loadingInfo.latestMessageID),
			ChunkLoader.get(this.loadingInfo.latestChunkID),
		]).then(([latestMessage, latestChunk]) => {
			this.loadingInfo = null

			this.chunkIDs = [latestChunk.getID()]

			return this.verifyMessageAssociations(latestMessage).thenReturn(latestMessage)
		}).then((latestMessage) => {
			this.addMessageID(latestMessage.getServerID(), latestMessage.getTime())
		})
	})

	loadMoreMessages() {
		const oldestKnownMessage = this.messages.length === 0 ? 0 : this.messages[0].id

		return Bluebird.try(async () => {
			const { messages, remainingMessagesCount } = await socketService.emit("chat.getMessages", { id: this.getID(), oldestKnownMessage })

			const messagesObjects = await Bluebird.all<Message>(messages.map((message) => MessageLoader.load(message)))

			messagesObjects.forEach((message) =>
				this.addMessageID(message.getServerID(), message.getTime())
			)

			return { remaining: remainingMessagesCount }
		})
	}

	loadInitialMessages = h.cacheResult<Bluebird<any>>(() => {
		return this.loadMoreMessages()
	})

	getMessages() {
		return this.messages
	}

	getMessagesAndUpdates() {
		return this.messagesAndUpdates
	}

	getChatUpdates() {
		return this.chatUpdates
	}

	getLatestChatUpdate() {
		if (this.chatUpdates.length > 0) {
			return h.array.last(this.chatUpdates).id
		}
	}

	getLatestChunk() {
		return h.array.last(this.chunkIDs)
	}

	getLatestMessage() {
		if (this.messages.length > 0) {
			return h.array.last(this.messages).id
		}
	}

	markRead() {
		// call server mark read function

		this.unreadMessageIDs = []
		unreadChatIDs = unreadChatIDs.filter((id) => id !== this.id)

		return socketService.definitlyEmit("chat.markRead", { id: this.id }).then(() => {

		})
	}

	getUnreadMessageIDs = () => {
		return this.unreadMessageIDs
	}

	addUnreadMessage(id) {
		if (this.unreadMessageIDs.indexOf(id) === -1) {
			this.unreadMessageIDs.push(id)
		}

		if (unreadChatIDs.indexOf(this.id) === -1) {
			unreadChatIDs.push(this.id)
		}
	}

	getPartners = () => {
		const latestChunk = ChunkLoader.getLoaded(this.getLatestChunk())

		return latestChunk.getPartners()
	}

	addReceivers = (newReceiverIDs, canReadOldMessages = false) => {
		const latestChunk = ChunkLoader.getLoaded(this.getLatestChunk())

		const oldReceivers = latestChunk.getReceiver()

		return this.setReceivers(oldReceivers.concat(newReceiverIDs), canReadOldMessages)
	}

	setReceivers = (receivers, canReadOldMessages) => {
		const latestChunk = ChunkLoader.getLoaded(this.getLatestChunk())

		if (!latestChunk.amIAdmin()) {
			throw new Error("Not an admin of this chunk")
		}

		return latestChunk.getSuccessor().then((successor) => {
			if (successor) {
				throw new Error("TODO: Chunk has a successor. Try again?")
			}

			return Chunk.createRawData(receivers, latestChunk)
		}).then((chunkData) => {
			if (!canReadOldMessages) {
				return chunkData
			}

			// TODO:  encrypt this chunks (and previous chunks) key with new chunks key

			throw new Error("not yet implemented")
		}).then((chunkData) => {
			return socketService.emit("chat.chunk.create", {
				predecessorID: latestChunk.getID(),
				chunkMeta: chunkData.chunk,
				keys: chunkData.keys,
				receiverKeys: chunkData.receiverKeys
			})
		}).then((response) => {
			return ChunkLoader.load(response.chunk)
		}).then((chunk) => {
			this.chunkIDs.push(chunk.getID())
		})
	}

	sendUnsentMessage = (messageData, files) => {
		var images = files.map((file) => {
			return new ImageUpload(file);
		});

		return this.sendMessage(messageData.message, images, messageData.id);
	};

	sendMessage = (message, images, id?) => {
		var messageObject = new Message(message, this, images, id)

		var messageSendCache = new Cache("messageSend", { maxEntries: -1, maxBlobSize: -1 });

		if (!id) {
			Bluebird.try(async () => {
				await Bluebird.all(images.map((img) => img.prepare()))

				const imagesBlobs = images.map((img) => img._blobs[0].blob._blobData)

				await messageSendCache.store(
					messageObject.getID(),
					{
						chatID: this.getID(),
						id: messageObject.getID(),
						message: message
					},
					imagesBlobs
				);
			})
		}

		var sendMessagePromise = messageObject.sendContinously();

		sendMessagePromise.then(() => {
			MessageLoader.addLoaded(messageObject.getID(), messageObject)
			this.removeMessageID(messageObject.getID())
			this.addMessageID(messageObject.getID(), messageObject.getTime())

			return messageSendCache.delete(messageObject.getID());
		});

		sendMessagePromise.catch((e) => {
			console.error(e);
			alert("An error occured sending a message!" + e.toString());
		});

		MessageLoader.addLoaded(messageObject.getID(), messageObject)
		this.addMessageID(messageObject.getID(), Number.MAX_SAFE_INTEGER)

		return null;
	};
}

const loadHook = (chatResponse) => {
	const loadChunks = Bluebird.all(chatResponse.chunks.map((chunkData) =>
		ChunkLoader.load(chunkData)
	))

	const loadMessages = Bluebird.all(chatResponse.messages.map((messageData) =>
		MessageLoader.load(messageData)
	))

	const chat = new Chat(chatResponse.chat)

	return Bluebird.all([
		loadChunks,
		loadMessages,
	]).then(() => chat.load()).thenReturn(chat)
}

const downloadHook = (id) => {
	return socketService.emit("chat.get", { id }).then((response) => response.chat)
}

const hooks = {
	downloadHook, loadHook
}

export default class ChatLoader extends ObjectLoader(hooks) {}

function loadUnreadChatIDs() {
	return initService.awaitLoading().then(function () {
		return Bluebird.delay(500);
	}).then(function () {
		return socketService.awaitConnection();
	}).then(function () {
		return socketService.emit("chat.getUnreadIDs", {});
	}).then(function (data) {
		unreadChatIDs = data.chatIDs
		//TODO: updateUnreadIDs(data.unread);
	});
}

socketService.on("connect", function () {
	loadUnreadChatIDs();
});

initService.listen(function () {
	loadUnreadChatIDs();
}, "initDone");
