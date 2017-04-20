import { Component, ViewChild, Input, Output, EventEmitter, ElementRef } from "@angular/core";

import { NavController, ActionSheetController, Platform, Content } from "ionic-angular";

import * as Bluebird from "bluebird";

import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

const ImageUpload = require("../assets/services/imageUploadService");

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

@Component({
	selector: "topicWithBursts",
	templateUrl: "topic.html"
})
export class TopicComponent {
	@Input() partners;
	@Input() topic;
	@Input() messageBurstsFunction;
	@Input() messagesLoading;
	@Input() forceBackButton;

	@Output() sendMessage = new EventEmitter();

	@ViewChild(Content) content: Content;
	@ViewChild('footer') footer: ElementRef;

	newMessageText = "";

	constructor(
		public navCtrl: NavController,
		private actionSheetCtrl: ActionSheetController,
		private platform: Platform,
		private imagePicker: ImagePicker,
		private file: File,
		private camera: Camera
	) {}

	contentHeight = 0;
	footerHeight = 0;

	ngAfterViewInit() {
		console.warn("attach keyboard listener");
		window.addEventListener('resize', this.keyboardChange);
	}

	ngOnDestroy() {
		window.removeEventListener('resize', this.keyboardChange);
	}

	keyboardChange = () => {
		console.warn("keyboard change");

		this.change();
	}

	sendMessageToTopic = () => {
		this.sendMessage.emit({
			text: this.newMessageText,
			images: []
		});

		this.newMessageText = "";
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
		return Bluebird.delay(100);
	}

	messageBursts = () => {
		const { changed, bursts } = this.messageBurstsFunction();

		const maybeFalse = false

		if (maybeFalse && changed) {
			const dimension = this.content.getContentDimensions();
			const scrollFromBottom = dimension.scrollHeight - dimension.scrollTop;

			this.awaitRendering().then(() => {
				const newDimension = this.content.getContentDimensions();

				this.content.scrollTo(dimension.scrollLeft, newDimension.scrollHeight - scrollFromBottom, 0);
			})
		}

		return bursts;
	}

	change() {
		setTimeout(() => {
			const fontSize = 16;
			const maxSize = fontSize*7;

			const footerElement = this.footer.nativeElement;

			if (!this.footerHeight) {
				this.footerHeight = footerElement.offsetHeight;
			}

			const textarea  = footerElement.getElementsByTagName("textarea")[0];

			textarea.style.minHeight  = "0";
			textarea.style.height     = "0";

			const scroll_height = Math.min(textarea.scrollHeight, maxSize);

			// apply new style
			textarea.style.minHeight  = scroll_height + "px";
			textarea.style.height     = scroll_height + "px";

			// this.content.scrollToBottom(0);
		}, 100);
	}

	goToProfile(userId: number) {
		this.navCtrl.push("Profile", {
			userId
		});
	}
}
