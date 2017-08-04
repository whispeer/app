import { Component, Input } from "@angular/core";

const prettysize = require("prettysize")

import { Message } from "../../lib/messages/message"

@Component({
	selector: "Message",
	templateUrl: "message.html"
})
export class MessageComponent {
	@Input() message: Message

	constructor() {}

	add = (arr, attr) => {
		return arr.reduce((prev, next) => prev + next[attr], 0)
	}

	voicemailDuration = () =>
		this.message.data.voicemails.reduce((prev, next) => prev + next.duration, 0)

	voicemailSize = () =>
		this.message.data.voicemails.reduce((prev, next) => prev + next.size, 0)

	voicemailLoaded = () =>
		this.message.data.voicemails.reduce((prev, next) => prev && next.loaded, true)

	downloadVoicemail = () => {
		this.message.downloadVoicemail()
	}

	voicemailPaused = () => {
		return false
	}

	voicemailPlaying = () => {
		return true
	}

	playVoicemail = () => {

	}

	pauseVoicemail = () => {

	}

	formatSize(size) {
		return prettysize(size, false, false, 2)
	}
}
