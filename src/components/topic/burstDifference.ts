import { Component, Input } from "@angular/core";

import h from "../../lib/helper/helper";

import ChunkLoader, { Chunk } from "../../lib/messages/chatChunk"
import { Message } from "../../lib/messages/message"
import { Chat } from "../../lib/messages/chat"
import { sameDay, sameChunk } from "../../lib/messages/burstHelper"

@Component({
	selector: "BurstDifference",
	templateUrl: "burstDifference.html"
})
export class BurstDifferenceComponent {
	@Input() chat: Chat
	@Input() message: Message
	@Input() previousMessage: Message
	@Input() noDates: boolean

	constructor() {}

	differentDay = () => {
		if (this.noDates || !this.chat || !this.chat.getLatestChunk) {
			return false
		}

		if (this.message && this.previousMessage) {
			return !sameDay(this.message, this.previousMessage)
		}

		return true
	}

	differentChunk = () => {
		if (!this.chat || !this.chat.getLatestChunk) {
			return false
		}

		if (this.message && this.previousMessage) {
			return !sameChunk(this.message, this.previousMessage)
		}

		if (this.previousMessage) {
			return this.previousMessage.getChunkID() !== this.chat.getLatestChunk()
		}

		return true
	}

	chunksBetweenBursts = () => {
		if (!this.previousMessage) {
			return []
		}

		const currentChunkID = this.message ? this.message.getChunkID() : this.chat.getLatestChunk()

		return this.getChunksBetween(
			ChunkLoader.getLoaded(currentChunkID),
			ChunkLoader.getLoaded(this.previousMessage.getChunkID())
		).reverse()
	}

	addedReceiver = (chunk: Chunk) => {
		const currentReceiveers = chunk.getReceivers()
		const previousReceiveers = ChunkLoader.getLoaded(chunk.getPredecessorID()).getReceivers()

		return currentReceiveers.filter((partner) => previousReceiveers.indexOf(partner) === -1)
	}

	removedReceiver = (chunk: Chunk) => {
		const currentReceiveers = chunk.getReceivers()
		const previousReceiveers = ChunkLoader.getLoaded(chunk.getPredecessorID()).getReceivers()

		return previousReceiveers.filter((partner) => currentReceiveers.indexOf(partner) === -1)
	}

	changedTitle = (chunk: Chunk) => {
		const currentTitle = chunk.getTitle()
		const previousTitle = ChunkLoader.getLoaded(chunk.getPredecessorID()).getTitle()

		if (currentTitle !== previousTitle) {
			return currentTitle
		}
	}

	getCreator = (chunk: Chunk) => {
		return chunk.getReceivers().find((user) => user.id === chunk.getCreator())
	}

	private getChunksBetween = (newerChunk: Chunk, olderChunk: Chunk) => {
		if (newerChunk.getID() === olderChunk.getID()) {
			return []
		}

		const predecessor = ChunkLoader.getLoaded(newerChunk.getPredecessorID())

		return [newerChunk, ...this.getChunksBetween(predecessor, olderChunk)]
	}

	hasPreviousChunk = () => {
		return Boolean(this.previousMessage)
	}

	receiver = () => {
		if (this.message) {
			return ChunkLoader.getLoaded(this.message.getChunkID()).getPartners()
		}

		return ChunkLoader.getLoaded(this.chat.getLatestChunk()).getPartners()
	}

	getTime = () => {
		if (this.message) {
			return this.message.getTime()
		}

		const latestChunk = ChunkLoader.getLoaded(this.chat.getLatestChunk())

		return h.parseDecimal(latestChunk.getTime())
	}

	getChunk = () => {
		const burstChunkID = this.message ? this.message.getChunkID() : this.chat.getLatestChunk()

		return ChunkLoader.getLoaded(burstChunkID)
	}

	hasTitleDifference = () => {
		if (!this.previousMessage) {
			return false
		}

		const previousBurstChunk = ChunkLoader.getLoaded(this.previousMessage.getChunkID())

		return this.getChunk().getTitle() !== previousBurstChunk.getTitle()
	}

	getTitle = () => this.getChunk().getTitle()
}
