import { Component, Input } from "@angular/core";
import { FileOpener } from '@ionic-native/file-opener'

const prettysize = require("prettysize")

import * as Bluebird from "bluebird"

import { Message } from "../../lib/messages/message"
import VoicemailPlayer from "../../lib/asset/voicemailPlayer"

import h from "../../lib/helper/helper"
import Progress from "../../lib/asset/Progress"
import blobService from "../../lib/services/blobService"
import blobCache from "../../lib/asset/blobCache"

const fileOpener = new FileOpener()

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

	constructor() {}

	add = (arr, attr) => {
		return arr.reduce((prev, next) => prev + next[attr], 0)
	}

	formatSize(size) {
		return prettysize(size, false, false, 2)
	}

	private voicemailPlayer: VoicemailPlayer

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

	voicemailProgress = () => {
		if(this.voicemailSending()) {
			return this.message.data.voicemails.reduce((acc, v) => {
				if(!v) return acc;

				return acc + v.getProgress() / this.message.data.voicemails.length;
			}, 0);
		}

		if (!this.voicemailDownloadProgress) {
			return 0
		}

		return this.voicemailDownloadProgress.getProgress()
	}

	voicemailSize = () =>
		this.message.data.voicemails.reduce((prev, next) => prev + next.size, 0)

	voicemailLoaded = () =>
		this.message.data.voicemails.reduce((prev, next) => prev && next.loaded, true)

	downloadFile = (file) => {
		const loadProgress = new Progress()

		file.getProgress = () => loadProgress.getProgress()

		blobService.getBlobUrl(file.blobID, loadProgress, file.size).then((url) => {
			if (window.device && window.device.platform === 'Android') {
				return blobCache.copyBlobToDownloads(file.blobID, file.name)
			}

			return url
		}).then((url) => {
			file.loaded = true
			file.url = url

			return fileOpener.open(url, file.type)
		}).catch((e) => {
			console.error(e)
			if (parseInt(e.status, 10) === 9) {
				alert(`Could not open file. No app found to open file type for ${file.name}`)
			} else {
				alert(`Something went wrong trying to load file ${file.name}`)
			}
		})
	}

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
}
