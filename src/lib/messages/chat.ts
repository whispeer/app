const sortedSet = require("asset/sortedSet")
import * as Bluebird from 'bluebird';

import socketService from "../services/socket.service"

const Chunk = require("messages/chatChunk")
const Message = require("models/message")

function sortGetTime(a, b) {
	return (a.getTime() - b.getTime());
}

const unreadChatIDs = []
const chatsByID = {}

/*
- object is added to by id as soon as we receive it (definitly)
- question: add object to list after it is verified or as soon as it is received (with a flag "loading")


-> verify chunk chain between all chunks under one chat!
-> add message to chat (but verify parent chunk is under said chat and verify parent chunk!)
->
*/

export default class Chat {
	private messages = sortedSet(sortGetTime)
	private chatUpdates = sortedSet(sortGetTime)
	private messagesAndUpdates = sortedSet(sortGetTime)

	private chunks = []
	private unreadMessageIDs = []
	private id: number

	private read: boolean

	static isChatLoaded(id) {
		return chatsByID.hasOwnProperty(id)
	}

	static load(chatResponse) {
		const loadChunks = Bluebird.all(chatResponse.chunks.map((chunkData) =>
			Chunk.load(chunkData)
		))

		const loadMessages = Bluebird.all(chatResponse.messages.map((messageData) =>
			Message.load(messageData)
		))

		const chat = new Chat(chatResponse.chat)

		return Bluebird.all([
			loadChunks,
			loadMessages,
			chat.load(),
		]).thenReturn(chat)
	}

	static get(id) {
		if (chatsByID[id]) {
			return Bluebird.resolve(chatsByID[id])
		}

		return socketService.emit("chat.get", { id }).then((chatResponse) =>
			Chat.load(chatResponse)
		)
	}

	constructor(chatData) {
		this.id = chatData.id

		// chatData.newest
		// chatData.unreadMessageIDs

		this.read = unreadChatIDs.indexOf(this.id) > -1
	}

	load() {
		// load latest message
		// load latest chunk
		// load latest chat update? (or is this rather unimportant?)
	}

	getMessages() {
		return this.messages
	}

	getMessagesAndUpdates() {
		return this.messagesAndUpdates
	}

	getChatUpdates() {
		return this.chatUpdates
	}

	getLatestChunk() {

	}

	markRead() {
		// call server mark read function
		this.unreadMessageIDs = []
		// unreadChatIDs.remove(this.id)
	}

	addUnreadMessage(id) {
		if (this.unreadMessageIDs.indexOf(id) === -1) {
			this.unreadMessageIDs.push(id)
		}

		if (unreadChatIDs.indexOf(this.id) === -1) {
			unreadChatIDs.push(this.id)
		}
	}

	getBursts() {

	}

	loadMoreMessages() {

	}

	getNewestMessage() {

	}
}
