import { Media, MediaObject } from '@ionic-native/media';
import * as Bluebird from "bluebird"

type FileType = {
	name: string,
	directory: string
}

type recordingType = {
	file: FileType,
	recording: MediaObject,
	duration: number
}

type recordingsType = recordingType[]

const media = new Media()

export default class VoicemailPlayer {
	private playing = false
	private recordings: recordingsType = []

	private recordPlayingIndex = 0
	private position = 0
	private interval = 0

	constructor(recordings: recordingsType) {
		this.recordings = recordings
	}

	play() {
		this.recordings[this.recordPlayingIndex].recording.play()

		clearInterval(this.interval)

		this.interval = window.setInterval(() => {
			this.recordings[this.recordPlayingIndex].recording.getCurrentPosition().then((pos: number) => {
				this.position = pos
			})
		}, 250)

		this.playing = true
	}

	pause() {
		this.recordings[this.recordPlayingIndex].recording.pause()

		this.playing = false
	}

	toggle() {
		if (this.playing) {
			this.pause()
		} else {
			this.play()
		}
	}

	isPlaying() {
		return this.playing
	}

	isPaused() {
		return !this.playing
	}

	getDuration(beforeIndex?: number) {
		return this.recordings.slice(0, beforeIndex).reduce((prev, next) => prev + next.duration, 0)
	}

	getPosition() {
		return this.getDuration(this.recordPlayingIndex) + this.position
	}

	reset() {
		clearInterval(this.interval)

		this.recordings.forEach(({ recording }) => recording.stop())

		this.recordPlayingIndex = 0
		this.position = 0
		this.interval = 0

		this.playing = false
	}

	addRecording(file: FileType, estimatedDuration: number) {
		const currentRecording = media.create(this.path(file))
		currentRecording.seekTo(0)

		currentRecording.onStatusUpdate.subscribe(this.statusListener)

		const recordingInfo = {
			file: file,
			recording: currentRecording,
			duration: estimatedDuration
		}

		const intervalID = window.setInterval(() => {
			if (currentRecording.getDuration() !== -1) {
				recordingInfo.duration = currentRecording.getDuration()
				clearInterval(intervalID)
			}
		}, 50)

		this.recordings.push(recordingInfo)
	}

	destroy() {
		this.recordings.forEach(({ recording, file }) => {
			recording.release()

			// TODO delete file created!
			console.warn("TODO: delete file:", file)
		})
	}

	getRecordings() {
		return [...this.recordings]
	}

	static awaitVoicemailLoading = (voicemails:recordingsType) => {
		return new Bluebird((resolve) => {
			const intID = setInterval(() => {
				if (!voicemails.some((v) => v.recording.getDuration() === -1)) {
					clearInterval(intID)
					resolve()
				}
			}, 50)
		})
	}

	private path = ({ name, directory }: { name: string, directory: string }) => {
		return `${directory}${name}`
	}

	private statusListener = (status) => {
		if (status === media.MEDIA_STOPPED && this.isPlaying()) {
			this.recordPlayingIndex += 1
			this.position = 0

			if (this.recordPlayingIndex >= this.recordings.length) {
				this.reset()
				return
			}

			this.recordings[this.recordPlayingIndex].recording.play()
		}
	}
}
