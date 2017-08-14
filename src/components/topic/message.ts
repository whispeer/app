import { Component, Input } from "@angular/core";

const prettysize = require("prettysize")

import * as Bluebird from "bluebird"

import { Message } from "../../lib/messages/message"
import VoicemailPlayer from "../../lib/asset/voicemailPlayer"

import h from "../../lib/helper/helper"
import Progress from "../../lib/asset/Progress"

@Component({
	selector: "Message",
	templateUrl: "message.html"
})
export class MessageComponent {
	_message: Message
	voicemailDownloadProgress: Progress

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

	voicemailProgress = () => {
		if (!this.voicemailDownloadProgress) {
			return 0
		}

		return this.voicemailDownloadProgress.getProgress()
	}

	voicemailDuration = () => {
		if (this.voicemailPlayer.getDuration() > 0) {
			return this.voicemailPlayer.getDuration()
		}

		return this.message.data.voicemails.reduce((prev, next) => prev + next.duration, 0)
	}

	voicemailPosition = () => {
		if (!this.voicemailPlayer) {
			return 0
		}

		return this.voicemailPlayer.getPosition()
	}

	voicemailSize = () =>
		this.message.data.voicemails.reduce((prev, next) => prev + next.size, 0)

	voicemailLoaded = () =>
		this.message.data.voicemails.reduce((prev, next) => prev && next.loaded, true)

	downloadVoicemail = h.cacheResult<Bluebird<void>>(() => {
		this.voicemailDownloadProgress = new Progress()

		return this.message.downloadVoicemail(this.voicemailDownloadProgress).then((files) =>
			files.forEach((file) => {
				this.voicemailPlayer.addRecording(file.url, file.duration)
			})
		)
	})

	voicemailPaused = () =>
		this.voicemailPlayer.isPaused()

	voicemailPlaying = () =>
		this.voicemailPlayer.isPlaying()

	voicemailSending = () =>
		!this.message.data.sent


	playVoicemail = () =>
		this.downloadVoicemail().then(() =>
			this.voicemailPlayer.play()
		)

	pauseVoicemail = () =>
		this.voicemailPlayer.pause()

	formatSize(size) {
		return prettysize(size, false, false, 2)
	}
}
