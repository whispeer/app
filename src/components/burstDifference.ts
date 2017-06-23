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
		if (this.noDates || !this.chat) {
			return false
		}

		if (this.burst && this.previousBurst) {
			return !this.burst.sameDay(this.previousBurst)
		}

		return true
	}

	differentChunk = () => {
		if (!this.chat) {
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

	getChunksBetween = (chunk: Chunk, previousChunk: Chunk) => {
		if (chunk.getID() === previousChunk.getID()) {
			return []
		}

		const predecessorChunk = ChunkLoader.getLoaded(chunk.getPredecessorID())

		if (!predecessorChunk) {
			return [chunk]
		}

		return this.getChunksBetween(predecessorChunk, previousChunk).concat([chunk])
	}

	getKnownPredecessors = (chunk: Chunk) => {
		if (!ChunkLoader.isLoaded(chunk.getPredecessorID())) {
			return [chunk]
		}

		const predecessorChunk = ChunkLoader.getLoaded(chunk.getPredecessorID())

		return this.getKnownPredecessors(predecessorChunk).concat([chunk])
	}

	getChunksOfInterest = () => {
		if (this.burst && this.previousBurst) {
			const burstChunk = ChunkLoader.getLoaded(this.burst.getChunkID())
			const previousBurstChunk = ChunkLoader.getLoaded(this.previousBurst.getChunkID())

			return this.getChunksBetween(burstChunk, previousBurstChunk)
		}

		if (this.burst) {
			const burstChunk = ChunkLoader.getLoaded(this.burst.getChunkID())

			return this.getKnownPredecessors(burstChunk)
		}

		if (this.previousBurst) {
			const chatChunk = ChunkLoader.getLoaded(this.chat.getLatestChunk())
			const previousBurstChunk = ChunkLoader.getLoaded(this.previousBurst.getChunkID())

			return this.getChunksBetween(chatChunk, previousBurstChunk)
		}

		return [this.chat]
	}

	newPersons = (chunk: Chunk) => {
		return this.getAddedReceivers(chunk).filter(function (u) {
			return !u.me
		})
	}

	getAddedReceivers = (chunk: Chunk) => {
		// TODO: (CH) chunk receivers!
		return chunk.getPartners()
	}

	personsAdded = (chunk: Chunk) => {
		return this.getAddedReceivers(chunk).filter(function (u) {
			return !u.me
		}).length > 0
	};

	wasIAdded = (chunk: Chunk) => {
		return this.getAddedReceivers(chunk).some(function (u) {
			return u.me
		})
	}

	getTime = () => {
		if (this.burst) {
			return this.burst.firstItem().getTime()
		}

		const latestChunk = ChunkLoader.getLoaded(this.chat.getLatestChunk())

		return h.parseDecimal(latestChunk.getTime())
	}
}
