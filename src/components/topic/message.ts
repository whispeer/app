import { Component, Input } from "@angular/core";
import * as Bluebird from "bluebird"

import { Message } from "../../lib/messages/message"
import VoicemailPlayer from "../../lib/asset/voicemailPlayer"

import h from "../../lib/helper/helper"
import Progress from "../../lib/asset/Progress"
import blobService from "../../lib/services/blobService"
import blobCache from "../../lib/asset/blobCache"

const EMOJIS = ["💩", "👻", "🤖", "🐋", "🌍"]

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
		const emoji = EMOJIS[size % EMOJIS.length]
		if (size < 1000) {
			return `${size} B`
		} else if (size < 1000 * 1000) {
			return `${Math.round(size / 100) / 10} kB`
		} else if (size < 1000 * 1000 * 1000) {
			return `${Math.round(size / (100 * 1000)) / 10} MB`
		} else if (size < 1000 * 1000 * 1000 * 1000) {
			return `${Math.round(size / (100 * 1000 * 1000)) / 10} GB`
		} else if (size < 1000 * 1000 * 1000 * 1000 * 1000) {
			return `${emoji} TB`
		} else {
			return `${emoji} PB`
		}
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
		const { message } = this
		if(!message.hasBeenSent()) {
			return message.data.voicemails.reduce((acc, v) => {
				if(!v) return acc;

				return acc + v.getProgress() / message.data.voicemails.length;
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
			return blobCache.copyBlobToDownloads(file.blobID, file.name)
		}).then((url) => {
			file.loaded = true
			file.url = url

			return blobCache.getFileMimeType(url).then((mimeType) => {
				return new Bluebird((success, error) => {
					window.cordova.plugins.fileOpener2.showOpenWithDialog(url, mimeType || "", { success, error })
				})
			})
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

	playVoicemail = () =>
		this.downloadVoicemail().then(() =>
			this.voicemailPlayer.play()
		)

	pauseVoicemail = () =>
		this.voicemailPlayer.pause()
}
