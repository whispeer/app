import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, SimpleChanges } from "@angular/core" // tslint:disable-line:no-unused-variable
import { Media, MediaObject } from '@ionic-native/media'
import { AlertController } from 'ionic-angular'

import { NavController, NavParams, IonicPage, ActionSheetController, Platform } from "ionic-angular"

import * as Bluebird from "bluebird"
import { TypeState } from "typestate"
import uuidv4 from 'uuid/v4'

import { ImagePicker } from '@ionic-native/image-picker'
import { File, FileEntry } from '@ionic-native/file'
import { Camera, CameraOptions } from '@ionic-native/camera'

import { TranslateService } from '@ngx-translate/core'

import { AndroidPermissions } from '@ionic-native/android-permissions'

import ImageUpload from "../../lib/services/imageUpload.service"
import FileUpload from "../../lib/services/fileUpload.service"
import errorService from "../../lib/services/error.service";
import { replaceView } from "../../lib/angularUtils"

import messageService from "../../lib/messages/messageService";
import ChatLoader, { Chat } from "../../lib/messages/chat"
import MessageLoader, { Message } from "../../lib/messages/message"
import { sameBurst } from "../../lib/messages/burstHelper"

import h from "../../lib/helper/helper"
import VoicemailPlayer, { audioInfo, recordingType } from "../../lib/asset/voicemailPlayer"

import { unpath } from "../../lib/services/blobService"
import featureToggles from "../../lib/services/featureToggles"

import { isBusinessVersion } from "../../lib/services/location.manager";

enum RecordingStates {
	NotRecording,
	Recording,
	Paused
}

var RecordingStateMachine = new TypeState.FiniteStateMachine<RecordingStates>(RecordingStates.NotRecording)

RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.Recording)
RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.NotRecording)

RecordingStateMachine.from(RecordingStates.Recording).to(RecordingStates.Paused)

const RECORDING_STOP_DELAY = 100

const ImagePickerOptions = {
	width: 2560,
	height: 1440,
	maximumImagesCount: 6
}

const INFINITE_SCROLLING_THRESHOLD = 1000

const MAXIMUM_FILE_SIZE_MB = isBusinessVersion() ? 15 : 10

const isIOS = () => window.device && window.device.platform === 'iOS'

const selectFileIOS = () =>
	new Bluebird<string>((resolve, reject) => window.FilePicker.pickFile(resolve, reject, "public.item"))
		.then((url) => `file://${url}`)

const selectFileAndroid = () =>
	new Bluebird<string>((resolve, reject) => window.fileChooser.open(resolve, reject))
		.then((url) => `file://${url}`)

const selectFile = () => isIOS() ? selectFileIOS() : selectFileAndroid()

const FILE = new File()

const inView = require("in-view");

const initService = require("../../lib/services/initService");

@IonicPage({
	name: "Messages",
	segment: "messages/:chatID",
	defaultHistory: ["Home"]
})
@Component({
	selector: 'page-messages',
	templateUrl: 'messages.html'
})
export class MessagesPage {
	private chatID: number;
	private chat: Chat;

	private messagesLoading: boolean = true;

	private lastMessageElement: any;

	private messages: any[];

	constructor(
		public navCtrl: NavController,
		private actionSheetCtrl: ActionSheetController,
		private platform: Platform,
		private imagePicker: ImagePicker,
		private camera: Camera,
		private translate: TranslateService,
		private media: Media,
		private alertController: AlertController,
		public navParams: NavParams,
		private element: ElementRef,
		private androidPermissions: AndroidPermissions
	) {
		this.cameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.FILE_URI,
			sourceType: this.camera.PictureSourceType.CAMERA,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			allowEdit: !this.platform.is('ios'),
			correctOrientation: true
		}

		this.recordingPlayer = new VoicemailPlayer([])

		RecordingStateMachine.on(RecordingStates.NotRecording, () => {
			if (!this.recordingFile) {
				return
			}

			this.recordingFile.release()
			this.recordingFile = null
		})

		RecordingStateMachine.onExit(RecordingStates.Paused, (to) => {
			this.recordingPlayer.reset()
			return true
		})

		document.addEventListener("pause", () => {
			if (RecordingStateMachine.is(RecordingStates.Recording)) {
				this.toggleRecording()
			}
		}, false);

		document.addEventListener("resume", () => {
			if (this.isRecordingUIVisible()) {
				this.recordingPlayer = new VoicemailPlayer(this.recordings)
			}
		})

		if(this.platform.is("ios")) {
			this.resizeEvents = [
				"resize",
				"native.keyboardshow",
				"native.keyboardhide"
			]
		} else {
			this.resizeEvents = ["resize"]
		}
	}

	@ViewChild('content') content: ElementRef
	@ViewChild('footer') footer: ElementRef

	stopRecordingPromise = Bluebird.resolve()
	recordingPlayer: VoicemailPlayer
	recordings: audioInfo[] = []

	private recordingFile: MediaObject

	firstRender: Boolean = true
	newMessageText = ""
	moreMessagesAvailable = true
	inViewMessages: any[] = []
	oldScrollFromBottom: number = 0
	inputFocus: boolean = false

	cameraOptions: CameraOptions

	mutationObserver: MutationObserver

	private recordingInfo = {
		UUID: "",
		duration: 0,
		startTime: 0,
		updateInterval: 0
	}

	private resizeEvents: string[]

	ngAfterViewInit() {
		this.resizeEvents.forEach(resizeEvent =>
			window.addEventListener(resizeEvent, this.keyboardChange)
		)

		this.content.nativeElement.addEventListener('scroll', this.onScroll)

		this.mutationObserver = new MutationObserver(this.mutationListener)
		this.mutationObserver.observe(this.content.nativeElement, { childList: true, subtree: true })
	}

	ngOnDestroy() {
		this.resizeEvents.forEach(resizeEvent =>
			window.removeEventListener(resizeEvent, this.keyboardChange)
		)

		this.content.nativeElement.removeEventListener('scroll', this.onScroll)

		this.mutationObserver.disconnect()
	}

	ionViewDidLeave() {
		if (!RecordingStateMachine.is(RecordingStates.NotRecording)) {
			this.discardRecording()
		}

		if (VoicemailPlayer.activePlayer) {
			VoicemailPlayer.activePlayer.reset()
		}
	}

	mutationListener = (mutations) => {
		const id = this.getFirstInViewMessageId()

		if (!id || this.oldScrollFromBottom < 15) {
			return this.stabilizeScroll()
		}

		const firstElement = document.querySelector(`[data-messageid="${id}"]`)

		const updateScroll = mutations.some((mutation) => {
			return [].slice.call(mutation.addedNodes).some((element) => {
				const position = firstElement.compareDocumentPosition(element)

				return position & 0x02
			})
		})

		if (updateScroll) {
			return this.stabilizeScroll()
		}

		console.warn("Only elements below newest messages have changed not updating viewport")
	}

	keyboardChange = () => {
		this.stabilizeScroll()
	}

	private sendVoicemail = () => {
		const player = new VoicemailPlayer(this.recordings)

		this.resetRecordingState()

		player.awaitLoading().then(() => player.getRecordings()).map(({ url, audio, duration }:recordingType) => {
			const { directory, name } = unpath(url)

			return FILE.moveFile(
				this.platform.is("ios") ? "file://" + directory : directory,
				name,
				FILE.cacheDirectory,
				name
			).then(() => ({
				url: `${FILE.cacheDirectory}${name}`,
				duration
			}))
		}).map((voicemail:recordingType) => {
			const { url, duration } = voicemail

			return this.getFile(url).then((fileObject) =>
				new FileUpload(fileObject, { encrypt: true, extraInfo: { duration } })
			)
		}).then((voicemails) => {
			this.sendMessage({
				text: "",
				voicemails,
			})
		}).catch((e) => {
			console.error("Sending voicemail failed", e)
			// TODO
		})
	}

	sameBurst = (m1: Message, m2: Message) => sameBurst(m1, m2)

	sendMessageToChat = () => {
		if (this.isRecordingUIVisible()) {
			if (this.isRecording()) {
				this.toggleRecording()
			}

			return this.stopRecordingPromise.then(() => this.sendVoicemail())
		}

		this.sendMessage({
			text: this.newMessageText
		})

		this.newMessageText = ""

		document.querySelector("textarea").focus()

		this.change()
	}

	showRecordIcon() {
		if (!featureToggles.isFeatureEnabled("chat.voiceMail")) {
			return false
		}

		return this.newMessageText.length === 0
	}

	showFileTooBigWarning() {
		const alert = this.alertController.create({
			title: this.translate.instant("topic.fileTooBigTitle"),
		  subTitle: this.translate.instant("topic.fileTooBigDetail", { max_size: MAXIMUM_FILE_SIZE_MB }),
		  buttons: ['OK']
		})
		alert.present()
	}

	getFile = (url: string, type?: string) : Bluebird<any> => {
		return Bluebird.resolve(FILE.resolveLocalFilesystemUrl(url))
			.then((file: FileEntry) => new Bluebird((resolve, reject) => file.file(resolve, reject)))
			.then((file: any) => {
				file.originalUrl = url
				if(this.platform.is("ios")) {
					file.localURL = url.replace("file://", `http://${window.location.host}`)
				}
				if (file.size > MAXIMUM_FILE_SIZE_MB * 1000 * 1000) {
					this.showFileTooBigWarning()
					throw new Error("File too big, not sending.")
				}
				if (type) {
					file.type = type
				}

				return file
			})
	}

	takeImage = () => {
		this.camera.getPicture(this.cameraOptions).then((url: any) => {
			return this.getFile(url, "image/png")
		}).then((file: any) => {
			return new ImageUpload(file)
		}).then((image) => {
			this.sendMessage({
				images: [image],
				text: ""
			})
		})
	}

	toggleInputFocus = () =>
		this.inputFocus = !this.inputFocus

	showCameraShortcut = () =>
		!this.inputFocus && this.newMessageText.length === 0

	isRecordingUIVisible = () =>
		!RecordingStateMachine.is(RecordingStates.NotRecording)

	isPlayback = () =>
		RecordingStateMachine.is(RecordingStates.Paused) && this.recordingPlayer.isPlaying()

	isRecording = () =>
		RecordingStateMachine.is(RecordingStates.Recording)

	isPaused = () =>
		RecordingStateMachine.is(RecordingStates.Paused)

	getRecordingDir = () => {
		if (!this.platform.is("ios")) {
			return FILE.externalRootDirectory
		}

		return FILE.tempDirectory.replace(/^file:\/\//, '')
	}

	getRecordingFileName = () => {
		const extension = this.platform.is("ios") ? "m4a" : "aac"
		const dir = this.getRecordingDir()

		return `${dir}recording_${this.recordingInfo.UUID}.${extension}`
	}

	private startRecording() {
		if (this.recordingFile) {
			return
		}

		this.androidPermissions.requestPermissions([
			this.androidPermissions.PERMISSION.RECORD_AUDIO,
			this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
		]).then(({ hasPermission }) => {
			if (!hasPermission) {
				return
			}

			RecordingStateMachine.go(RecordingStates.Recording)

			this.recordingInfo.UUID = uuidv4()

			this.recordingFile = this.media.create(this.getRecordingFileName())

			this.recordingInfo.startTime = Date.now()
			this.recordingFile.startRecord()

			clearInterval(this.recordingInfo.updateInterval)
			this.recordingInfo.updateInterval = window.setInterval(() => {
				this.recordingInfo.duration = (Date.now() - this.recordingInfo.startTime) / 1000
			}, 100)

			if (VoicemailPlayer.activePlayer) {
				VoicemailPlayer.activePlayer.pause()
			}
			VoicemailPlayer.setPlaybackBlocked(true)
		})
	}

	formatTime = (seconds) => {
		const fullSeconds = h.pad(Math.floor(seconds % 60), 2)
		const minutes = h.pad(Math.floor(seconds / 60), 2)

		return `${minutes}:${fullSeconds}`
	}

	getCurrentDuration = (beforeIndex?: number) => {
		if (beforeIndex) {
			return 0
		}

		if (!RecordingStateMachine.is(RecordingStates.Recording)) {
			return 0
		}

		return this.recordingInfo.duration
	}

	getDuration = (beforeIndex?: number) => {
		return this.recordingPlayer.getDuration() + this.getCurrentDuration()
	}

	toggleRecording = () => {
		if (this.stopRecordingPromise.isPending()) {
			return
		}

		if (RecordingStateMachine.is(RecordingStates.Recording)) {
			this.stopRecordingPromise = Bluebird.resolve().delay(RECORDING_STOP_DELAY).then(() => {
				RecordingStateMachine.go(RecordingStates.Paused)

				this.recordingFile.stopRecord()
				this.recordingFile.release()
				this.recordingFile = null

				this.recordings.push({
					url: this.getRecordingFileName(),
					estimatedDuration: this.recordingInfo.duration
				})

				clearInterval(this.recordingInfo.updateInterval)
				this.recordingInfo.duration = 0

				this.recordingPlayer = new VoicemailPlayer(this.recordings)

				VoicemailPlayer.setPlaybackBlocked(false)
			})
		} else {
			return this.startRecording()
		}
	}

	resetRecordingState = () => {
		if (this.recordingFile) {
			this.recordingFile.release()
			this.recordingFile = null
		}

		VoicemailPlayer.setPlaybackBlocked(false)
		clearInterval(this.recordingInfo.updateInterval)

		this.recordingPlayer.reset()
		this.recordingPlayer = new VoicemailPlayer([])
		this.recordings = []

		RecordingStateMachine.go(RecordingStates.NotRecording)
	}

	discardRecording = () => this.resetRecordingState()

	getPosition = () => this.recordingPlayer ? this.recordingPlayer.getPosition() : 0

	togglePlayback = () => this.recordingPlayer ? this.recordingPlayer.toggle() : null

	presentActionSheet = () => {
		const cameraButton = {
			text: this.translate.instant("topic.takePhoto"),
			icon: !this.platform.is("ios") ? "camera": null,
			handler: () => {
				this.takeImage()
			}
		}

		const galleryButton = {
			text: this.translate.instant("topic.selectGallery"),
			icon: !this.platform.is("ios") ? "image": null,
			handler: () => {
				Bluebird.resolve(this.imagePicker.getPictures(ImagePickerOptions)).map((result: any) => {
					return this.getFile(result, "image/png")
				}).map((file: any) => {
					return new ImageUpload(file)
				}).then((images) => {
					this.sendMessage({
						images,
						text: ""
					})
				})
			}
		}

		const fileButton = {
			text: this.translate.instant("topic.selectFile"),
			icon: !this.platform.is("ios") ? "document": null,
			handler: () => {
				selectFile()
					.then(file => this.getFile(file))
					.then(file => new FileUpload(file, { encrypt: true, extraInfo: {} }))
					.then(file => {
						this.sendMessage({
							files: [file],
							text: ""
						})
					})
			}
		}

		const cancelButton = {
			text: this.translate.instant("general.cancel"),
			icon: !this.platform.is("ios") ? "close" : null,
			role: "cancel"
		}

		const buttons = featureToggles.isFeatureEnabled("chat.fileTransfer") ?
			[ cameraButton, galleryButton, fileButton, cancelButton ] :
			[ cameraButton, galleryButton, cancelButton ]

		let actionSheet = this.actionSheetCtrl.create({
			buttons
		})

		actionSheet.present()
	}

	realScrollHeight(element) {
		return element.scrollHeight - element.clientHeight
	}

	isInView = (element, headerHeight) => {
		const top = element.getBoundingClientRect().top - headerHeight

		return top > 0 && top < this.content.nativeElement.clientHeight
	}

	updateElementsInView = h.debounce(() => {
		const headerHeight = document.querySelector(".header").clientHeight

		const messages = Array.prototype.slice.call(
			this.content.nativeElement.querySelectorAll(".messages__wrap")
		)

		this.inViewMessages = messages.filter((e) => this.isInView(e, headerHeight))
	}, 20)

	checkLoadMoreMessages() {
		if (this.messagesLoading || !this.moreMessagesAvailable || !this.loadMoreMessages) {
			return
		}

		const { scrollTop } = this.content.nativeElement

		if (scrollTop < INFINITE_SCROLLING_THRESHOLD) {
			this.messagesLoading = true

			setTimeout(() => {
				this.loadMoreMessages().then((remaining) => {
					this.moreMessagesAvailable = remaining !== 0
					this.messagesLoading = false
				})
			}, 0)
		}
	}

	onScroll = () => {
		this.oldScrollFromBottom = this.scrollFromBottom()

		this.updateElementsInView()
		this.checkLoadMoreMessages()
	}

	scrollFromBottom = () => {
		const element = this.content.nativeElement
		return this.realScrollHeight(element) - element.scrollTop
	}

	stabilizeScrollIfHeightChanged = (height, scrollFromBottom) => {
		const element = this.content.nativeElement

		const newHeight = this.realScrollHeight(element)

		if (newHeight !== height) {
			console.warn(`Height changed from ${height} to ${newHeight}`)

			this.oldScrollFromBottom = scrollFromBottom
			this.stabilizeScroll()

			return true
		}

		return false
	}

	checkHeightChange = (height, scrollFromBottom, maximumTime) => {
		const delayTime = 25

		Bluebird.delay(delayTime).then(() => {
			if (!this.stabilizeScrollIfHeightChanged(height, scrollFromBottom) && maximumTime > 0) {
				this.checkHeightChange(height, scrollFromBottom, maximumTime - delayTime)
			}
		})
	}

	stabilizeScroll = () => {
		const element = this.content.nativeElement

		const height = this.realScrollHeight(element)
		const newScrollTop = height - this.oldScrollFromBottom

		element.scrollTop = newScrollTop

		this.checkHeightChange(height, this.oldScrollFromBottom, this.platform.is('ios') ? 300 : 50)
	}

	getFirstInViewMessageId = () => {
		const firstInViewMessage = this.inViewMessages[0]

		if (firstInViewMessage) {
			return firstInViewMessage.getAttribute("data-messageid")
		}
	}

	isPreviousMissing(message: Message) {
		const messages = this.getMessages()

		if (messages[0] === message || !message.getPreviousID()) {
			return false
		}

		return messages.findIndex((m) =>
			m.getClientID() === message.getPreviousID()
		) === -1
	}

	ngOnChanges(changes: SimpleChanges) {
		const chatChanges = changes["chat"]

		if (!chatChanges || !chatChanges.currentValue || this.newMessageText !== "") {
			return
		}

		this.newMessageText = chatChanges.currentValue.newMessage
	}

	change() {
		setTimeout(() => {
			if (this.chat) {
				this.chat.newMessage = this.newMessageText
			}

			const fontSize = 16

			const minSize = 30
			const maxSize = fontSize*7

			const footerElement = this.footer.nativeElement

			const textarea  = footerElement.getElementsByTagName("textarea")[0]

			textarea.style.minHeight  = "0"
			textarea.style.height     = "0"

			const scroll_height = Math.max(minSize, Math.min(textarea.scrollHeight, maxSize))

			// apply new style
			textarea.style.minHeight  = scroll_height + "px"
			textarea.style.height     = scroll_height + "px"

			this.stabilizeScroll()
		}, 100)
	}

	goToDetails() {
		if (!this.chat) {
			return
		}

		this.navCtrl.push("Chat Details", {
			chatID: this.chat.getID()
		})
	}

	goToProfile(userId: number) {
		if (this.chat) {
			return
		}

		this.navCtrl.push("Profile", {
			userId
		})

	}

	ngOnInit() {
		this.chatID = parseFloat(this.navParams.get("chatID"));

		if (this.chatID < 0) {
			if (!ChatLoader.isLoaded(this.chatID)) {
				this.navCtrl.setRoot("Home")
				this.navCtrl.popToRoot()
				return
			}
		}

		initService.awaitLoading().then(() =>
			messageService.getChat(this.chatID)
		).then((chat) => {
			this.chat = chat;

			chat.loadInitialMessages().then(() => {
				this.messagesLoading = false;
				this.chat.markRead().catch(errorService.criticalError)
			});
		})
	}

	ionViewDidEnter = () => {}

	getPartners = () => {
		if (!this.chat) {
			return []
		}

		return this.chat.getPartners()
	}

	getMessages = () => {
		if (!this.chat) {
			return this.messages = []
		}

		return this.messages = this.chat.getMessages()
			.map(({ id }) => MessageLoader.getLoaded(id))
	}

	getBurstClass = (message, $index) => {
		const previousMessageSameBurst = sameBurst(message, this.messages[$index - 1])
		const nextMessageSameBurst = sameBurst(message, this.messages[$index + 1])

		if (previousMessageSameBurst && nextMessageSameBurst) {
			return "burst--middle"
		}

		if (previousMessageSameBurst) {
			return "burst--last"
		}

		if (nextMessageSameBurst) {
			return "burst--first"
		}

		return "burst--last burst--first"
	}

	getMessageItemClass = (message, $index) => {
		const meOrOther = message.isOwn() ? "burst--me" : "burst--other"
		const burstClass = this.getBurstClass(message, $index)

		return [meOrOther, burstClass]
	}

	ngAfterViewChecked() {
		this.registerMarkReadListener()
	}

	onElementInView = ({ target }) => {
		if (inView.is(this.lastMessageElement)) {
			this.markRead()
			target.removeEventListener("scroll", this.onElementInView)
		}
	}

	registerMarkReadListener() {
		if (!this.chat || !this.chat.isUnread()) {
			return
		}

		const selector = ".messages__burst:last-child .messages__wrap:last-child"
		const lastMessageElement: Element = this.element.nativeElement.querySelector(selector)

		if (!lastMessageElement || lastMessageElement === this.lastMessageElement) {
			return
		}

		this.lastMessageElement = lastMessageElement

		if (inView.is(lastMessageElement)) {
			this.markRead()
			return
		}

		document.querySelector(".messages__list").addEventListener("scroll", this.onElementInView)
	}

	loadMoreMessages = () => {
		console.warn("load more messages")

		this.messagesLoading = true;

		return this.chat.loadMoreMessages().then((remaining) => {
			this.messagesLoading = false;
			return remaining
		})
	}

	markRead = () => {
		setTimeout(() => {
			console.log('mark topic read', this.chat.getID())
			this.chat.markRead().catch(errorService.criticalError)
		}, 0)
	}

	sendMessage = ({ text, images = [], files = [], voicemails = [] }: { text: string, images?: any[], files?: any[], voicemails?: any[] }) => {
		if (text.length === 0 && images.length === 0 && files.length === 0 && voicemails.length === 0) {
			return;
		}

		const sendPromise = this.chat.sendMessage(text, { images, files, voicemails })

		if (this.chat.isDraft()) {
			sendPromise
				.then(() => replaceView(this.navCtrl, "Messages", { chatID: this.chat.getID() }, 1, { animate: false }))
		}

		this.chat.newMessage = ""
		this.markRead()
	}
}
