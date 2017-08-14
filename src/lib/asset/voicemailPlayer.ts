import { Media, MediaObject } from '@ionic-native/media';
import * as Bluebird from "bluebird"

import { Platform } from "ionic-angular"

const platform = new Platform()

type FileType = {
	name: string,
	directory: string
}

export type recordingType = {
	path: string,
	recording: MediaObject,
	duration: number
}

export type recordingsType = recordingType[]

const media = new Media()

export default class VoicemailPlayer {
	private playing = false
	private recordings: recordingsType = []

	private recordPlayingIndex = 0
	private position = 0
	private interval = 0
	private loadingPromises : Bluebird<any>[] = []

	constructor(recordings: recordingsType) {
		this.recordings = recordings
	}

	play() {
		console.log("play")
		this.awaitLoading().then(() => {
			console.log("play ready")
			this.recordings[this.recordPlayingIndex].recording.play()

			clearInterval(this.interval)

			this.interval = window.setInterval(() => {
				this.recordings[this.recordPlayingIndex].recording.getCurrentPosition().then((pos: number) => {
					this.position = pos
				})
			}, 100)

			this.playing = true
		})
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

	awaitLoading = () => {
		return Bluebird.all(this.loadingPromises)
	}

	addRecording(path: string, estimatedDuration: number) {
		const isIOS = (<any>window).device.platform === "iOS"

		const currentRecording = media.create(isIOS ? path.replace(/^file:\/\//, '') : path)

		currentRecording.play()

		const recordingInfo = {
			path,
			recording: currentRecording,
			duration: estimatedDuration
		}

		const loadingPromise = new Bluebird((resolve) => {
			const subscription = currentRecording.onStatusUpdate.subscribe((s) => {
				console.log("status update in ", s)
				if (s === media.MEDIA_RUNNING) {
					currentRecording.stop()
				}

				if (s === media.MEDIA_STOPPED) {
					subscription.unsubscribe()
					resolve()
				}
			})
		}).then(() => {
			recordingInfo.duration = currentRecording.getDuration()

			currentRecording.onStatusUpdate.subscribe(this.statusListener)
		})

		this.loadingPromises.push(loadingPromise)

		this.recordings.push(recordingInfo)
	}

	destroy() {
		this.recordings.forEach(({ recording, path }) => {
			recording.release()

			// TODO delete file created!
			console.warn("TODO: delete file:", path)
		})
	}

	getRecordings() {
		return [...this.recordings]
	}

	private statusListener = (status) => {
		console.log("Status update: " + status)

		if (status === media.MEDIA_STOPPED && this.isPlaying()) {
			// Use a Promise to trigger the angular zone. Zones are bad. Angular DI is bad.
			Bluebird.resolve().then(() => {
				this.recordPlayingIndex += 1
				this.position = 0

				if (this.recordPlayingIndex >= this.recordings.length) {
					this.reset()
					return
				}

				this.recordings[this.recordPlayingIndex].recording.play()
			})
		}
	}
}
