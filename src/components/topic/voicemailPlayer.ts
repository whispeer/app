import { Component, Input, ElementRef } from "@angular/core";

import * as Bluebird from "bluebird"

import { formatSize } from "../../lib/asset/sizeFormatter"
import VoicemailPlayer from "../../lib/asset/voicemailPlayer"
import blobService from "../../lib/services/blobService"
import Progress from "../../lib/asset/Progress"

const loadVoicemail = (voicemail) => {
	const loadProgress = new Progress()

	voicemail.loading = true
	voicemail.getProgress = () => loadProgress.getProgress()

	return blobService.getBlobUrl(voicemail.blobID, loadProgress, voicemail.size).then((url) => {
		voicemail.url = url
		voicemail.loading = false
		voicemail.loaded = true
		return voicemail
	})
}

let playBackBlocked = false

@Component({
	selector: "voicemailplayer",
	templateUrl: "voicemailPlayer.html"
})
export class VoicemailPlayerComponent {
	@Input()
	voicemails: {
		duration: number,
		size: number,
		loading: boolean,
		loaded: boolean
		getProgress: () => number
	}[]
	@Input() hasBeenSent: boolean = true
	private player: VoicemailPlayer
	private previousTime: number
	private startTime: number = 0
	seekVal: number = 0

	toggle = () => this.isPlaying() ? this.pause() : this.play()

	downloadable = () => !this.isLoaded() && this.hasBeenSent

	isPlaying = () => this.player ? this.player.isPlaying() : false

	isLoading = () => !!this.voicemails.find(({ loading }) => loading)

	getProgress = () => this.voicemails.reduce((prev, { getProgress }) => getProgress ? prev + getProgress(): 0, 0) / this.voicemails.length

	getSize = () => this.voicemails.reduce((prev, { size }) => prev + size, 0)

	isLoaded = () => this.voicemails.reduce((prev, { loaded }) => prev && loaded, true)

	timeUpdate = (position) => {
		const time = Math.floor(position)

		const progress = position * 100 / this.getDuration()

		const ele : HTMLElement = this.element.nativeElement

		const progressBar = ele.querySelector(".vom--progress--bar")

		if (progressBar instanceof HTMLElement) {
			progressBar.style.width = `${Math.round(progress * 10) / 10}%`
		}

		if (this.previousTime === time) {
			return
		}

		this.previousTime = time
		ele.querySelector(".vom--position").innerHTML = this.formatPosition(time)
	}

	formatPosition = (position: number) => {
		const minutes = Math.floor(position / 60)
		const seconds = Math.floor(position % 60)

		const secondsString = `0${seconds}`.substr(-2)

		return `${minutes}:${secondsString}`
	}

	formatSize = formatSize

	seekTo = (position: number) => {
		if (this.player) {
			return this.player.seekTo(position)
		}

		this.startTime = position
		this.timeUpdate(position)
	}

	loadAndPlay = () => {
		const voicemails = this.voicemails

		return Bluebird.resolve(voicemails)
			.map((voicemail) => loadVoicemail(voicemail))
			.map(({ url, duration }) => ({ url, estimatedDuration: duration }))
			.then((voicemails) => new VoicemailPlayer(voicemails))
			.then((player) => {
				this.player = player
				this.player.onPositionUpdateRAF(this.timeUpdate)

				this.player.awaitLoading().then(() => {
					this.player.seekTo(this.startTime)
					this.player.play()
				})
			})
	}

	play = () => this.player ? this.player.play() : this.loadAndPlay()

	pause = () => this.player.pause()

	getDuration = () => this.player ? this.player.getDuration() : this.voicemails.reduce((prev, { duration }) => prev + duration, 0)

	constructor(private element: ElementRef) {}
}
