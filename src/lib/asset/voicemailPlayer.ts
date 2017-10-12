import { Media, MediaObject } from '@ionic-native/media';
import * as Bluebird from "bluebird"

export type recordingType = {
	path: string,
	recording: MediaObject,
	duration: number
}

export type recordingsType = recordingType[]

const media = new Media()

export default class VoicemailPlayer {

	private static activePlayer: VoicemailPlayer = null
	private playing = false
	private recordings: recordingsType = []

	private recordPlayingIndex = 0
	private position = 0
	private interval : number = null
	private loadingPromises : Bluebird<any>[] = []

	constructor(recordings: recordingsType) {
		this.recordings = recordings
	}

	play() {
		this.awaitLoading().then(() => {
			this.recordings[this.recordPlayingIndex].recording.play()
			clearInterval(this.interval)

			this.interval = window.setInterval(() => {
				const indexAtInvocation = this.recordPlayingIndex
				this.recordings[this.recordPlayingIndex].recording.getCurrentPosition().then((pos: number) => {
					if (indexAtInvocation === this.recordPlayingIndex && this.interval !== null && pos != -1) {
						this.position = pos
					}
				})
			}, 100)

			if (VoicemailPlayer.activePlayer) {
				VoicemailPlayer.activePlayer.reset()
			}
			VoicemailPlayer.activePlayer = this
			this.playing = true
		})
	}

	pause() {
		this.recordings[this.recordPlayingIndex].recording.pause()
		VoicemailPlayer.activePlayer = null
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
		const currentDuration = this.getDuration(this.recordPlayingIndex)
		return currentDuration + this.position
	}

	reset() {
		clearInterval(this.interval)

		this.recordings.forEach(({ recording }) => recording.stop())

		this.recordPlayingIndex = 0
		this.position = 0
		this.interval = null

		VoicemailPlayer.activePlayer = null
		this.playing = false
	}

	awaitLoading = () => {
		return Bluebird.all(this.loadingPromises)
	}

	addRecording(path: string, estimatedDuration: number) {
		const isIOS = window.device.platform === "iOS"

		const currentRecording = media.create(isIOS ? path.replace(/^file:\/\//, '') : path)

		currentRecording.play()

		const recordingInfo = {
			path,
			recording: currentRecording,
			duration: estimatedDuration
		}

		const loadingPromise = new Bluebird((resolve) => {
			const subscription = currentRecording.onStatusUpdate.subscribe((s) => {
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
