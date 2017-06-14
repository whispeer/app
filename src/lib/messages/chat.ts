const sortedSet = require("asset/sortedSet")
import * as Bluebird from 'bluebird';

import socketService from "../services/socket.service"

import ObjectLoader from "../services/objectLoader"

const Chunk = require("messages/chatChunk")
const Message = require("models/message")

function sortGetTime(a, b) {
	return (a.getTime() - b.getTime());
}

const unreadChatIDs = []

/*
- object is added to by id as soon as we receive it (definitly)
- question: add object to list after it is verified or as soon as it is received (with a flag "loading")


-> verify chunk chain between all chunks under one chat!
-> add message to chat (but verify parent chunk is under said chat and verify parent chunk!)
->
*/

export class Chat {
	private messages = sortedSet(sortGetTime)
	private chatUpdates = sortedSet(sortGetTime)
	private messagesAndUpdates = sortedSet(sortGetTime)

	private unreadMessageIDs = []
	private id: number
	private latestMessageID: number
	private latestChunkID: number

	constructor(chatData) {
		this.id = chatData.id

		this.latestMessageID = chatData.latestMessageID
		this.latestChunkID = chatData.latestChunkID
		this.unreadMessageIDs = chatData.unreadMessageIDs
	}

	isUnread() {
		return unreadChatIDs.indexOf(this.id) > -1
	}

	load() {
		return Bluebird.all([
			ChunkLoader.get(this.latestChunkID),
			MessageLoader.get(this.latestMessageID)
		])
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

const loadHook = (chatResponse) => {
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
	]).then(() => chat.load()).thenReturn(chat)
}

const downloadHook = (id) => {
	return socketService.emit("chat.get", { id })
}

const hooks = {
	downloadHook, loadHook
}

export default class ChatLoader extends ObjectLoader(hooks) {}
