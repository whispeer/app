import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, SimpleChanges } from "@angular/core" // tslint:disable-line:no-unused-variable
import { Media, MediaObject } from '@ionic-native/media';

import { NavController, ActionSheetController, Platform } from "ionic-angular"

import * as Bluebird from "bluebird"

import { ImagePicker } from '@ionic-native/image-picker'
import { File, FileEntry } from '@ionic-native/file'
import { Camera, CameraOptions } from '@ionic-native/camera'

import { TranslateService } from '@ngx-translate/core'

import ImageUpload from "../../lib/services/imageUpload.service"
import FileUpload from "../../lib/services/fileUpload.service"

import h from "../../lib/helper/helper";
import { TypeState } from "typestate"

import uuidv4 from 'uuid/v4'

import VoicemailPlayer, { recordingType } from "../../lib/asset/voicemailPlayer"

import { unpath } from "../../lib/services/blobService"
import Burst from "../../lib/messages/burst"
import featureToggles from "../../lib/services/featureToggles"

enum RecordingStates {
	NotRecording,
	Recording,
	Paused
}

var RecordingStateMachine = new TypeState.FiniteStateMachine<RecordingStates>(RecordingStates.NotRecording);

RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.Recording)
RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.NotRecording)

RecordingStateMachine.from(RecordingStates.Recording).to(RecordingStates.Paused)

const ImagePickerOptions = {
	width: 2560,
	height: 1440,
	maximumImagesCount: 6
};

const INFINITE_SCROLLING_THRESHOLD = 1000

const isIOS = () => window.device && window.device.platform === 'iOS'
const isAndroid = () => window.device && window.device.platform === 'Android'

const selectFileIOS = () =>
	new Bluebird<string>((resolve, reject) => window.FilePicker.pickFile(resolve, reject))
		.then((url) => `file://${url}`)

const selectFileAndroid = () =>
	new Bluebird<string>((resolve, reject) => window.fileChooser.open(resolve, reject))

const selectFile = () => isIOS() ? selectFileIOS() : selectFileAndroid()

const FILE = new File()

@Component({
	selector: "topicWithBursts",
	templateUrl: "topic.html"
})
export class TopicComponent {
	@Input() partners;
	@Input() chat;
	@Input() messageBurstsFunction;
	@Input() loadMoreMessages;
	@Input() messagesLoading;
	@Input() forceBackButton;

	@Output() sendMessage = new EventEmitter();

	@ViewChild('content') content: ElementRef;
	@ViewChild('footer') footer: ElementRef;

	recordingPlayer: VoicemailPlayer

	private recordingFile: MediaObject

	firstRender: Boolean = true
	newMessageText = "";
	moreMessagesAvailable = true
	inViewMessages: any[] = []
	oldScrollFromBottom: number = 0
	inputFocus: boolean = false

	cameraOptions: CameraOptions

	mutationObserver: MutationObserver

	bursts: Burst[]

	private recordingInfo = {
		UUID: "",
		duration: 0,
		startTime: 0,
		updateInterval: 0
	}

	constructor(
		public navCtrl: NavController,
		private actionSheetCtrl: ActionSheetController,
		private platform: Platform,
		private imagePicker: ImagePicker,
		private camera: Camera,
		private translate: TranslateService,
		private media: Media
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
	}

	ngAfterViewInit() {
		window.addEventListener('resize', this.keyboardChange);
		this.content.nativeElement.addEventListener('scroll', this.onScroll)

		this.mutationObserver = new MutationObserver(this.mutationListener);
		this.mutationObserver.observe(this.content.nativeElement, { childList: true, subtree: true });
	}

	ngOnDestroy() {
		window.removeEventListener('resize', this.keyboardChange);
		this.content.nativeElement.removeEventListener('scroll', this.onScroll)

		this.mutationObserver.disconnect()
	}

	mutationListener = (mutations) => {
		const id = this.getFirstInViewMessageId()

		if (!id || this.oldScrollFromBottom < 15) {
			return this.stabilizeScroll()
		}

		const firstElement = document.querySelector(`[data-messageid="${id}"]`)

		const updateScroll = mutations.some((mutation) => {
			return [].slice.call(mutation.addedNodes).some((element) => {
				const position = firstElement.compareDocumentPosition(element);

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
		const voicemails = this.recordingPlayer.getRecordings()

		this.recordingPlayer.awaitLoading().thenReturn(voicemails).map(({ path, recording, duration }:recordingType) => {
			const { directory, name } = unpath(path)

			return FILE.moveFile(
				this.platform.is("ios") ? "file://" + directory : directory,
				name,
				FILE.cacheDirectory,
				name
			).then(() => ({
				path: `${FILE.cacheDirectory}${name}`,
				duration, recording
			}))
		}).map((voicemail:recordingType) => {
			const { path, duration } = voicemail

			return this.getFile(path).then((fileObject) =>
				new FileUpload(fileObject, { encrypt: true, extraInfo: { duration } })
			)
		}).then((voicemails) => {
			this.sendMessage.emit({
				text: "",
				voicemails,
			})
		}).catch((e) => {
			console.error("Sending voicemail failed", e)
			// TODO
		})

		this.resetRecordingState()
	}

	sendMessageToChat = () => {
		if (this.isRecordingUIVisible()) {
			if (this.isRecording()) {
				this.toggleRecording()
			}

			this.sendVoicemail()

			return
		}

		this.sendMessage.emit({
			text: this.newMessageText
		});

		this.newMessageText = "";

		document.querySelector("textarea").focus()

		this.change();
	}

	showRecordIcon() {
		if (!featureToggles.isFeatureEnabled("chat.voiceMail")) {
			return false
		}

		return this.newMessageText.length === 0
	}

	getFile = (url: string, type?: string) : Bluebird<any> => {
		return Bluebird.resolve(FILE.resolveLocalFilesystemUrl(url))
			.then((file: FileEntry) => new Bluebird((resolve, reject) => file.file(resolve, reject)))
			.then((file: any) => {
				file.originalUrl = url;
				if(this.platform.is("ios")) {
					file.localURL = url.replace("file://", `http://${window.location.host}`);
				}

				if (type) {
					file.type = type;
				}

				return file;
			});
	}

	takeImage = () => {
		this.camera.getPicture(this.cameraOptions).then((url: any) => {
			return this.getFile(url, "image/png");
		}).then((file: any) => {
			return new ImageUpload(file);
		}).then((image) => {
			this.sendMessage.emit({
				images: [image],
				text: ""
			});
		});
	};

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
		const recordingID = this.recordingPlayer.getRecordings().length;
		const extension = this.platform.is("ios") ? "m4a" : "aac"
		const dir = this.getRecordingDir()

		return `${dir}recording_${this.recordingInfo.UUID}_${recordingID}.${extension}`
	}

	private startRecording() {
		if (this.recordingFile) {
			return
		}

		if (!this.recordingInfo.UUID) {
			this.recordingInfo.UUID = uuidv4()
		}

		this.recordingFile = this.media.create(this.getRecordingFileName())

		this.recordingInfo.startTime = Date.now()

		this.recordingFile.startRecord();

		clearInterval(this.recordingInfo.updateInterval)

		this.recordingInfo.updateInterval = window.setInterval(() => {
			this.recordingInfo.duration = (Date.now() - this.recordingInfo.startTime) / 1000
		}, 100)
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
		if (RecordingStateMachine.is(RecordingStates.Recording)) {
			RecordingStateMachine.go(RecordingStates.Paused)

			clearInterval(this.recordingInfo.updateInterval)

			this.recordingFile.stopRecord()
			this.recordingFile.release()
			this.recordingFile = null

			this.recordingPlayer.addRecording(this.getRecordingFileName(), this.recordingInfo.duration)

			this.recordingInfo.duration = 0
		} else {
			RecordingStateMachine.go(RecordingStates.Recording)

			this.startRecording()
		}
	}

	resetRecordingState = () => {
		if (this.recordingFile) {
			this.recordingFile.release()
			this.recordingFile = null
		}

		clearInterval(this.recordingInfo.updateInterval)

		this.recordingPlayer.reset()
		this.recordingPlayer = new VoicemailPlayer([])

		RecordingStateMachine.go(RecordingStates.NotRecording)
	}

	discardRecording = () => {
		this.recordingPlayer.destroy()
		this.resetRecordingState()
	}

	getPosition = () => {
		return this.recordingPlayer.getPosition()
	}

	togglePlayback = () => {
		this.recordingPlayer.toggle()
	}

	presentActionSheet = () => {
		let actionSheet = this.actionSheetCtrl.create({
			buttons: [
				{
					text: this.translate.instant("topic.takePhoto"),
					icon: !this.platform.is("ios") ? "camera": null,
					handler: () => {
						this.takeImage();
					}
				}, {
					text: this.translate.instant("topic.selectGallery"),
					icon: !this.platform.is("ios") ? "image": null,
					handler: () => {
						Bluebird.resolve(this.imagePicker.getPictures(ImagePickerOptions)).map((result: any) => {
							return this.getFile(result, "image/png");
						}).map((file: any) => {
							return new ImageUpload(file);
						}).then((images) => {
							this.sendMessage.emit({
								images,
								text: ""
							});
						});
					}
				}, {
					text: this.translate.instant("topic.selectFile"),
					icon: !this.platform.is("ios") ? "document": null,
					handler: () => {
						selectFile()
							.then((file) => this.getFile(file))
							.then((fileObject) => new FileUpload(fileObject, { encrypt: true, extraInfo: {} }))
							.then((file) => {
								this.sendMessage.emit({
									files: [file],
									text: ""
								})
							})
					}
				}, {
					text: this.translate.instant("general.cancel"),
					icon: !this.platform.is("ios") ? "close" : null,
					role: "cancel"
				}
			]
		});

		actionSheet.present();
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
		return this.realScrollHeight(element) - element.scrollTop;
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

	afterViewBurstMessages() {
		const id = this.getFirstInViewMessageId()

		if (!id) {
			return { changed: false, bursts: [] }
		}

		const { changed, bursts } = this.messageBurstsFunction({
			after: id
		});

		return { changed, bursts };
	}

	allBurstMessages() {
		const { bursts } = this.messageBurstsFunction();

		return bursts;
	}

	messageBursts = () => {
		const { changed, bursts } = this.afterViewBurstMessages()

		if (changed) {
			const scrollFromBottom = this.scrollFromBottom()

			if (scrollFromBottom > 15) {
				this.bursts = bursts
				return bursts
			}
		}

		this.firstRender = false

		this.bursts = this.allBurstMessages()

		return this.bursts
	}

	isPreviousMissing(burst: Burst) {
		const message = burst.getItems()[0]

		if (this.bursts[0] === burst || !message.getPreviousID()) {
			return false
		}

		return this.bursts.findIndex((burst) =>
			burst.getItems().findIndex((m) =>
				m.getClientID() === message.getPreviousID()
			) > -1
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

			const fontSize = 16;

			const minSize = 30;
			const maxSize = fontSize*7;

			const footerElement = this.footer.nativeElement;

			const textarea  = footerElement.getElementsByTagName("textarea")[0];

			textarea.style.minHeight  = "0";
			textarea.style.height     = "0";

			const scroll_height = Math.max(minSize, Math.min(textarea.scrollHeight, maxSize));

			// apply new style
			textarea.style.minHeight  = scroll_height + "px";
			textarea.style.height     = scroll_height + "px";

			this.stabilizeScroll()
		}, 100);
	}

	goToDetails() {
		if (!this.chat) {
			return
		}

		this.navCtrl.push("Chat Details", {
			chatID: this.chat.id
		});
	}

	goToProfile(userId: number) {
		if (this.chat) {
			return
		}

		this.navCtrl.push("Profile", {
			userId
		});
	}
}
