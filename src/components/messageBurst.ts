import { Component, Input } from "@angular/core";

const prettysize = require("prettysize")

import Burst from "../lib/messages/burst"
import { Message } from "../lib/messages/message"

@Component({
	selector: "MessageBurst",
	templateUrl: "messageBurst.html"
})
export class MessageBurstComponent {
	@Input() burst: Burst

	constructor() {}

	add = (arr, attr) => {
		return arr.reduce((prev, next) => prev + next[attr], 0)
	}

	voicemailsLoaded = (message: Message) => {
		return message.data.voicemails.reduce((prev, next) => prev && next.loaded, true)
	}

	downloadVoicemail = (message: Message) => {
		message.downloadVoicemail()
	}

	toggleVoicemailPlayback = () => {

	}

	formatSize(size) {
		return prettysize(size, false, false, 2)
	}
}
