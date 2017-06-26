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

	hasPreviousChunk = () => {
		return Boolean(this.previousBurst)
	}

	addedReceiver = () => {
		const burstChunkID = this.burst ? this.burst.getChunkID() : this.chat.getLatestChunk()

		const burstChunk = ChunkLoader.getLoaded(burstChunkID)
		const previousBurstChunk = ChunkLoader.getLoaded(this.previousBurst.getChunkID())

		const currentPartners = burstChunk.getPartners()
		const previousPartners = previousBurstChunk.getPartners()

		const added = currentPartners.filter((partner) => previousPartners.indexOf(partner) === -1)

		return added
	}

	receiver = () => {
		const burstChunk = ChunkLoader.getLoaded(this.burst.getChunkID())

		return burstChunk.getPartners()
	}

	getTime = () => {
		if (this.burst) {
			return this.burst.firstItem().getTime()
		}

		const latestChunk = ChunkLoader.getLoaded(this.chat.getLatestChunk())

		return h.parseDecimal(latestChunk.getTime())
	}
}
