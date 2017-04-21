import { Component, ViewChild, Input, Output, EventEmitter, ElementRef } from "@angular/core";

import { NavController, ActionSheetController, Platform } from "ionic-angular";

import * as Bluebird from "bluebird";

import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

const ImageUpload = require("../lib/services/imageUploadService");
const h = require("whispeerHelper");

const ImagePickerOptions = {
	width: 2560,
	height: 1440,
	maximumImagesCount: 6
};

const CameraOptions = {
	destinationType: 1, // value 2 breaks ios.
	allowEdit: true,
	encodingType: 0,
	// targetWidth: ImagePickerOptions.width,
	// targetHeight: ImagePickerOptions.height,
	// correctOrientation: true
};

const INFINITE_SCROLLING_THRESHOLD = 1000

@Component({
	selector: "topicWithBursts",
	templateUrl: "topic.html"
})
export class TopicComponent {
	@Input() partners;
	@Input() topic;
	@Input() messageBurstsFunction;
	@Input() loadMoreMessages;
	@Input() messagesLoading;
	@Input() forceBackButton;

	@Output() sendMessage = new EventEmitter();

	@ViewChild('content') content: ElementRef;
	@ViewChild('footer') footer: ElementRef;

	newMessageText = "";
	moreMessagesAvailable = true
	inViewMessages: any[] = []
	oldScrollFromBottom: number = 0

	constructor(
		public navCtrl: NavController,
		private actionSheetCtrl: ActionSheetController,
		private platform: Platform,
		private imagePicker: ImagePicker,
		private file: File,
		private camera: Camera
	) {}

	ngAfterViewInit() {
		window.addEventListener('resize', this.keyboardChange);
		this.content.nativeElement.addEventListener('scroll', this.onScroll)
	}

	ngOnDestroy() {
		window.removeEventListener('resize', this.keyboardChange);
		this.content.nativeElement.removeEventListener('scroll', this.onScroll)
	}


	keyboardChange = () => {
		this.stabilizeScroll(this.oldScrollFromBottom)
	}

	sendMessageToTopic = () => {
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
				file.localURL = url.replace("file://", "http://ionic.local");
			}
			file.type = type;

			return file;
		});
	}

	presentActionSheet = () => {
		let actionSheet = this.actionSheetCtrl.create({
			buttons: [
				{
					text: "Take Photo",
					handler: () => {
						this.camera.getPicture(CameraOptions).then((url) => {
							return this.getFile(url, "image/png");
						}).then((file: any) => {
							return new ImageUpload(file);
						}).then((image) => {
							this.sendMessage.emit({
								images: [image],
								text: ""
							});
						});
					}
				}, {
					text: "Select from Gallery",
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
					text: "Cancel",
					role: "cancel",
					handler: () => {
						console.log("Cancel clicked.");
					}
				}
			]
		});

		actionSheet.present();
	}

	awaitRendering = () => {
		return Bluebird.delay(0);
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
		if (this.messagesLoading || !this.moreMessagesAvailable) {
			return
		}

		const scrollTop = this.content.nativeElement.scrollTop

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

	stabilizeScroll = (scrollFromBottom: number) => {
		const element = this.content.nativeElement
		const newScrollTop = this.realScrollHeight(element) - scrollFromBottom

		element.scrollTop = newScrollTop
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
		const { changed, bursts } = this.messageBurstsFunction();

		if (changed) {
			const scrollFromBottom = this.scrollFromBottom()
			this.awaitRendering().then(() => this.stabilizeScroll(scrollFromBottom))
		}

		return bursts;
	}

	messageBursts = () => {
		const scrollFromBottom = this.scrollFromBottom()

		if (scrollFromBottom > 15) {
			const { changed, bursts } = this.afterViewBurstMessages()

			if (changed) {
				return bursts
			}
		}

		return this.allBurstMessages()
	}

	change() {
		setTimeout(() => {
			const scrollFromBottom = this.scrollFromBottom()

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

			this.stabilizeScroll(scrollFromBottom)
		}, 100);
	}

	goToProfile(userId: number) {
		this.navCtrl.push("Profile", {
			userId
		});
	}
}
