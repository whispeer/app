import { Component, Input } from "@angular/core";

import h from "../lib/helper/helper";

import ChunkLoader, { Chunk } from "../lib/messages/chatChunk"
import { Chat } from "../lib/messages/chat"
import Burst from "../lib/messages/burst"

@Component({
	selector: "BurstDifference",
	templateUrl: "burstDifference.html"
})
export class BurstDifferenceComponent {
	@Input() chat: Chat
	@Input() burst: Burst
	@Input() previousBurst: Burst
	@Input() noDates: boolean

	constructor() {}

	differentDay = () => {
		if (this.noDates || !this.chat || !this.chat.getLatestChunk) {
			return false
		}

		if (this.burst && this.previousBurst) {
			return !this.burst.sameDay(this.previousBurst)
		}

		return true
	}

	differentChunk = () => {
		if (!this.chat || !this.chat.getLatestChunk) {
			return false
		}

		if (this.burst && this.previousBurst) {
			return !this.burst.sameChunk(this.previousBurst)
		}

		if (this.previousBurst) {
			return this.previousBurst.getChunkID() !== this.chat.getLatestChunk()
		}

		return true
	}

	chunksBetweenBursts = () => {
		if (!this.previousBurst) {
			return []
		}

		const currentChunkID = this.burst ? this.burst.getChunkID() : this.chat.getLatestChunk()

		return this.getChunksBetween(
			ChunkLoader.getLoaded(currentChunkID),
			ChunkLoader.getLoaded(this.previousBurst.getChunkID())
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
		return Boolean(this.previousBurst)
	}

	receiver = () => {
		if (this.burst) {
			return ChunkLoader.getLoaded(this.burst.getChunkID()).getPartners()
		}

		return ChunkLoader.getLoaded(this.chat.getLatestChunk()).getPartners()
	}

	getTime = () => {
		if (this.burst) {
			return this.burst.firstItem().getTime()
		}

		const latestChunk = ChunkLoader.getLoaded(this.chat.getLatestChunk())

		return h.parseDecimal(latestChunk.getTime())
	}

	getChunk = () => {
		const burstChunkID = this.burst ? this.burst.getChunkID() : this.chat.getLatestChunk()

		return ChunkLoader.getLoaded(burstChunkID)
	}

	hasTitleDifference = () => {
		if (!this.previousBurst) {
			return false
		}

		const burstChunk = this.getChunk()
		const previousBurstChunk = ChunkLoader.getLoaded(this.previousBurst.getChunkID())

		return burstChunk.getTitle() !== previousBurstChunk.getTitle()
	}

	getTitle = () => this.getChunk().getTitle()
}
