import { Component, Input } from "@angular/core";
import * as Bluebird from "bluebird"

import { Message } from "../../lib/messages/message"

import Progress from "../../lib/asset/Progress"
import blobService from "../../lib/services/blobService"
import blobCache from "../../lib/asset/blobCache"
import { queue as fileTransferQueue } from '../../lib/services/fileTransferQueue'

const EMOJIS = ["💩", "👻", "🤖", "🐋", "🌍"]

const FILE_DOWNLOAD_DELAY = 500

@Component({
	selector: "Message",
	templateUrl: "message.html"
})
export class MessageComponent {

	_message: Message

	voicemailDownloadProgress: Progress


	@Input() set message(_message: Message) {
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

	downloadFile = (file) => {
		const loadProgress = new Progress()

		file.getProgress = () => loadProgress.getProgress()

		fileTransferQueue.enqueue(1, () =>
			blobService
				.getBlobUrl(file.blobID, file.type, file.size, loadProgress)
				.then(url => blobCache.copyBlobToDownloads(file.blobID, file.name, file.type))
				.delay(FILE_DOWNLOAD_DELAY)
				.then((url) => {
					file.loaded = true
					file.url = url
					return blobCache.getFileMimeType(url).then(mimeType =>
						new Bluebird((success, error) =>
							window.cordova.plugins.fileOpener2.showOpenWithDialog(url, mimeType || "", { success, error })
						)
					)})
				.catch(e => {
					delete file.getProgress
					alert(parseInt(e.status, 10) === 9
						? `Could not open file. No app found to open file type for ${file.name}`
						: `Download of file ${file.name} failed`)
				})
			)
	}
}
