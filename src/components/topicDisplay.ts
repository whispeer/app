import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, SimpleChanges } from "@angular/core"
import { Media, MediaObject } from '@ionic-native/media';

import { NavController, ActionSheetController, Platform } from "ionic-angular"

import * as Bluebird from "bluebird"

import { ImagePicker } from '@ionic-native/image-picker'
import { File } from '@ionic-native/file'
import { Camera, CameraOptions } from '@ionic-native/camera'

import { TranslateService } from '@ngx-translate/core'

const ImageUpload = require("../lib/services/imageUploadService")
import h from "../lib/helper/helper"

import { TypeState } from "typestate"

enum RecordingStates {
	NotRecording,
	Recording,
	Paused,
	Playing
}

var RecordingStateMachine = new TypeState.FiniteStateMachine<RecordingStates>(RecordingStates.NotRecording);

RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.Recording)
RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.NotRecording)

RecordingStateMachine.from(RecordingStates.Recording).to(RecordingStates.Paused)
RecordingStateMachine.from(RecordingStates.Paused).to(RecordingStates.Playing)
RecordingStateMachine.from(RecordingStates.Playing).to(RecordingStates.Paused)

const ImagePickerOptions = {
	width: 2560,
	height: 1440,
	maximumImagesCount: 6
};

const INFINITE_SCROLLING_THRESHOLD = 1000

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

	private recordingFile: MediaObject

	firstRender: Boolean = true
	newMessageText = "";
	moreMessagesAvailable = true
	inViewMessages: any[] = []
	oldScrollFromBottom: number = 0

	cameraOptions: CameraOptions

	mutationObserver: MutationObserver

	bursts: any[]

	constructor(
		public navCtrl: NavController,
		private actionSheetCtrl: ActionSheetController,
		private platform: Platform,
		private imagePicker: ImagePicker,
		private file: File,
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

		RecordingStateMachine.on(RecordingStates.NotRecording, () => {
			if (!this.recordingFile) {
				return
			}

			this.recordingFile.release()
			this.recordingFile = null
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

	sendMessageToChat = () => {
		this.sendMessage.emit({
			text: this.newMessageText,
			images: []
		});

		this.newMessageText = "";

		this.change();
	}

	getFile = (url: string, type: string) : Bluebird<any> => {
		return new Bluebird((resolve, reject) => {
			this.file.resolveLocalFilesystemUrl(url).then((entry: any) => {
				return entry.file(resolve, reject);
			});
		}).then((file: any) => {
			file.originalUrl = url;
			if(this.platform.is("ios")) {
				file.localURL = url.replace("file://", `http://${window.location.host}`);
			}
			file.type = type;

			return file;
		});
	}

	takeImage = () => {
		this.camera.getPicture(this.cameraOptions).then((url) => {
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

	isRecordingUIVisible = () =>
		!RecordingStateMachine.is(RecordingStates.NotRecording)

	isPlayback = () =>
		RecordingStateMachine.is(RecordingStates.Playing)

	isRecording = () =>
		RecordingStateMachine.is(RecordingStates.Recording)

	isPaused = () =>
		RecordingStateMachine.is(RecordingStates.Paused) ||
		RecordingStateMachine.is(RecordingStates.Playing)

	private startRecording() {
		if (this.recordingFile) {
			return
		}

		const recordingID = 5

		const fileName = `${this.file.externalRootDirectory}recording_${recordingID}.aac`

		this.recordingFile = this.media.create(fileName)

		this.recordingFile.onStatusUpdate.subscribe(status => console.log(status))
		this.recordingFile.onSuccess.subscribe(() => console.log('Action is successful'))
		this.recordingFile.onError.subscribe(error => console.log('Error!', error));

		this.recordingFile.startRecord();
	}

	toggleRecording = () => {
		if (RecordingStateMachine.is(RecordingStates.Recording)) {
			RecordingStateMachine.go(RecordingStates.Paused)
		} else {
			this.startRecording()
			RecordingStateMachine.go(RecordingStates.Recording)
		}
	}

	resumeRecording = () => {
		RecordingStateMachine.go(RecordingStates.Recording)
	}

	discardRecording = () => {
		RecordingStateMachine.go(RecordingStates.NotRecording)
	}

	togglePlayback = () => {
		if (RecordingStateMachine.is(RecordingStates.Paused)) {
			RecordingStateMachine.go(RecordingStates.Playing)
		} else {
			RecordingStateMachine.go(RecordingStates.Paused)
		}
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
								images: images,
								text: ""
							});
						});
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
			const maxSize = fontSize*7;

			const footerElement = this.footer.nativeElement;

			const textarea  = footerElement.getElementsByTagName("textarea")[0];

			textarea.style.minHeight  = "0";
			textarea.style.height     = "0";

			const scroll_height = Math.min(textarea.scrollHeight, maxSize);

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
