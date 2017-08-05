import { Component, Input } from "@angular/core";

const prettysize = require("prettysize")

import { Message } from "../../lib/messages/message"
import VoicemailPlayer from "../../lib/asset/voicemailPlayer"

@Component({
	selector: "Message",
	templateUrl: "message.html"
})
export class MessageComponent {
	_message: Message

	@Input() set message(_message: Message) {
		const voicemails = _message.data.voicemails

		if (voicemails && voicemails.length > 0) {
			this.voicemailPlayer = new VoicemailPlayer([])
		}

		this._message = _message
	}

	get message(): Message {
		return this._message
	}

	private voicemailPlayer: VoicemailPlayer

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
		this.message.downloadVoicemail().then((files) => {
			files.forEach((file) => {
				this.voicemailPlayer.addRecording(file.url, file.duration)
			})
		})
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
