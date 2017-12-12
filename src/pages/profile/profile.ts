import { Component } from "@angular/core";
import { NavController, NavParams, ActionSheetController, AlertController, AlertOptions, Platform, IonicPage } from 'ionic-angular';
import sessionService from '../../lib/services/session.service';
import reportService from "../../lib/services/reportService";
import * as Bluebird from 'bluebird';

const userService = require("users/userService").default
const friendsService = require("services/friendsService")
import blobService from "../../lib/services/blobService"
import ImageUpload from "../../lib/services/imageUpload.service"

import { ImagePicker } from "@ionic-native/image-picker";
import { File } from "@ionic-native/file";
import { Camera } from "@ionic-native/camera";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { TranslateService } from '@ngx-translate/core';

import settings from "../../lib/services/settings.service"

const ImagePickerOptions = {
	width: 2560,
	height: 1440,
	maximumImagesCount: 1
};

const CameraOptions = {
	destinationType: 1, // value 2 breaks ios.
	allowEdit: true,
	encodingType: 0,
	// targetWidth: ImagePickerOptions.width,
	// targetHeight: ImagePickerOptions.height,
	// correctOrientation: true
};

const imageUploadOptions = {
	sizes: [
		{
			name: "lowest",
			restrictions: {
				maxWidth: 480,
				maxHeight: 480,
				square: true
			}
		}
	],
	gif: false,
	original: false,
	encrypt: false
}

@IonicPage({
	name: "Profile",
	segment: "profile/:userId"
})
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage {
	user: any = {
		basic: {},
		names: {},
		advanced: {}
	};

	userObject: any;
	userId: number;

	isRequest: boolean;
	isRequestable: boolean;
	isOwn: boolean;

	fingerprint: string[];

	view: string = "profile";

	profileLoading: boolean = true;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private actionSheetCtrl: ActionSheetController,
		private alertCtrl: AlertController,
		private platform: Platform,
		private file: File,
		private camera: Camera,
		private imagePicker: ImagePicker,
		private barcodeScanner: BarcodeScanner,
		private photoViewer: PhotoViewer,
		private translate: TranslateService,
	) {}

	ngOnInit() {
		this.userId = parseInt(this.navParams.get("userId"), 10)
		this.isOwn = true;

		const awaitFriendsService = friendsService.awaitLoading().then(() => {
			var requests = friendsService.getRequests();
			this.isRequest = requests.indexOf(this.userId) > -1

			this.isOwn = this.userId === parseInt(sessionService.userid, 10)

			this.isRequestable = friendsService.noRequests(this.userId) && !this.isOwn;
		});

		Bluebird.all([
			userService.get(this.userId),
			awaitFriendsService
		]).then(([user]) => {
			if (user.isNotExistingUser()) {
				this.user = user.data
				this.profileLoading = false
				return;
			}

			var fp = user.getFingerPrint();
			this.fingerprint = [fp.substr(0,13), fp.substr(13,13), fp.substr(26,13), fp.substr(39,13)];

			return user.loadBasicData().thenReturn(user);
		}).then((user) => {
			this.userObject = user;
			this.user = this.userObject.data;

			this.profileLoading = false;
		});
	}

	getTitle() {
		if (this.isOwn) {
			return this.translate.instant("profile.ownTitle")
		}

		if(this.isBlocked()) {
			return this.translate.instant("blocked.userReplacement")
		}

		return this.translate.instant("profile.otherTitle", { name: this.user.name })
	}

	attributeSet(val) {
		if (Array.isArray(val)) {
			return val.length > 0;
		}

		if (typeof val === "object") {
			return Object.keys(val).length > 0;
		}

		return val;
	}

	goBack() {
		this.navCtrl.pop();
	}

	block = () => {
		if (this.isBlocked()) {
			return
		}

		const blockConfirm = this.alertCtrl.create({
			title: this.translate.instant("profile.contacts.blockConfirm.title"),
			message: this.translate.instant("profile.contacts.blockConfirm.message"),
			buttons: [{
				text: this.translate.instant("profile.contacts.blockConfirm.cancel")
			}, {
				text: this.translate.instant("profile.contacts.blockConfirm.confirm"),
				handler: () => {
					settings.setBlockedUsers([...settings.getBlockedUsers(), { id: this.userId, since: Date.now() }])
					this.removeBlockedUser()
				}
			}]
		});

		blockConfirm.setCssClass('logout-confirm');
		blockConfirm.present();
	}

	unblock = () => settings.setBlockedUsers(settings.getBlockedUsers().filter(({ id }) => id !== this.userId))

	isBlocked = () => settings.isBlocked(this.userId)

	private addOrAccept() {
		if (this.isRequest) {
			return friendsService.acceptFriendShip(this.userId).then(() => {
				this.alertCtrl.create({
					title: this.translate.instant("profile.contacts.accepted"),
					message: this.translate.instant("profile.contacts.acceptedMessage", { name: this.user.name }),
					buttons: [this.translate.instant("general.ok")]
				}).present();
			});
		}

		return friendsService.friendship(this.userId).then(() => {
			this.alertCtrl.create({
				title: this.translate.instant("profile.contacts.requestSent"),
				message: this.translate.instant("profile.contacts.requestSentMessage", { name: this.user.name }),
				buttons: [this.translate.instant("general.ok")]
			}).present();
		});
	}

	acceptRequest() {
		let addOrAcceptConfirm;

		if(this.isRequest) {
			addOrAcceptConfirm = this.alertCtrl.create({
				title: this.translate.instant("profile.contacts.acceptRequest", { name: this.user.name }),
				message: this.translate.instant("profile.contacts.acceptRequestQuestion", { name: this.user.name }),
				buttons: [
					{ text: this.translate.instant("general.decline"), role: 'danger' },
					{ text: this.translate.instant("general.accept"),
						handler: () => {
							this.doAdd();
						}
					}
				]
			});
			addOrAcceptConfirm.setCssClass("profile__request-accept");
		} else {
			addOrAcceptConfirm = this.alertCtrl.create({
				title: this.translate.instant("profile.contacts.sendRequest"),
				message: this.translate.instant("profile.contacts.sendRequestQuestion", { name: this.user.name }),
				buttons: [
					{ text: this.translate.instant("general.cancel"), role: 'cancel' },
					{ text: this.translate.instant("profile.contacts.send"),
						handler: () => {
							this.doAdd();
						}
					}
				]
			});
			addOrAcceptConfirm.setCssClass("profile__send-confirm");
		}

		addOrAcceptConfirm.present();
	}

	private doAdd() {
		this.profileLoading = true;

		this.addOrAccept().then(() => {
			this.profileLoading = false;
			this.isRequest = false;
		});
	}

	declineRequest() {
		if (!this.isRequest) {
			this.isRequestable = false;
			return;
		}

		this.profileLoading = true;

		friendsService.ignoreFriendShip(this.userId).then(() => {
			this.profileLoading = false;
			this.isRequest = false;
		});
	}

	writeMessage() {
		this.navCtrl.push("New Message", {
			receiverIds: this.user.id.toString()
		});
	}

	verifyPerson = () => {
		return this.barcodeScanner.scan().then((res) => {
			return this.userObject.verifyFingerPrint(res.text);
		}).then((data) => {
			this.alertCtrl.create({
				title: this.translate.instant("profile.verify.success.heading"),
				message: this.translate.instant("profile.verify.success.body"),
				buttons: [
					{ text: 'Cancel', role: 'cancel' },
					{ text: this.translate.instant("profile.verify.success.action"),
						handler: () => {
							this.navCtrl.push("Profile", {userId: sessionService.userid})
						}
					}
				]
			});
			return data;
		}).catch((err) => {
			console.error(err);
			this.alertCtrl.create({
				title: this.translate.instant("profile.verify.fail.heading"),
				message: this.translate.instant("profile.verify.fail.body"),
				buttons: [
					{ text: 'Cancel', role: 'cancel' },
					{ text: this.translate.instant("profile.verify.fail.action"),
						handler: () => {
							this.verifyPerson()
						}
					}
				]
			});
		});
	}

	removeFriendClick = () => {
		this.alertCtrl.create(<AlertOptions>{
			title: this.translate.instant("profile.contacts.removeTitle"),
			message: this.translate.instant("profile.contacts.removeQuestion", { name: this.user.name }),
			buttons: [{
				text: this.translate.instant("general.cancel"),
				role: "cancel"
			}, {
				text: this.translate.instant("profile.contacts.removeConfirmButtonText"),
				role: "destructive",
				cssClass: "alert-button-danger",
				handler: () => {
					this.user.user.removeAsFriend();
				}
			}]
		}).present();
	}

	removeBlockedUser = () => {
		if(this.isRequest || this.isRequestable) {
			return
		}

		// this is pretty similar to removeFriendClick but at the same time it's different enough to create a new function
		this.alertCtrl.create(<AlertOptions>{
			title: this.translate.instant("profile.contacts.blocked.removeTitle"),
			message: this.translate.instant("profile.contacts.blocked.removeQuestion", { name: this.user.name }),
			buttons: [{
				text: this.translate.instant("profile.contacts.blocked.removeCancelButtonText"),
				role: "cancel"
			}, {
				text: this.translate.instant("profile.contacts.blocked.removeConfirmButtonText"),
				role: "destructive",
				cssClass: "alert-button-danger",
				handler: () => {
					this.user.user.removeAsFriend();
				}
			}]
		}).present();
	}

	contactOptions() {
		const verifyButton = {
			icon: !this.platform.is("ios") ? "lock": null,
			text: this.translate.instant("profile.verify.action"),
			handler: () => {
				this.verifyPerson();
			}
		}

		const removeFriendButton = {
			text: this.translate.instant("profile.contacts.removeButtonText"),
			role: "destructive",
			icon: !this.platform.is("ios") ? "trash" : null,
			handler: this.removeFriendClick
		}

		const cancelButton = {
			text: this.translate.instant("general.cancel"),
			role: "cancel",
			icon: !this.platform.is("ios") ? "close" : null,
		}

		const buttons = this.user.trustLevel < 2 ? [verifyButton, removeFriendButton, cancelButton] : [removeFriendButton, cancelButton]

		this.actionSheetCtrl.create({
			buttons
		}).present();
	}

	// 1:1 copy from topicDisplay. maybe this should go into the helper?
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

	removeProfileImage() {
		this.userObject.removeProfileAttribute("image"),
		this.userObject.removeProfileAttribute("imageBlob")

		return this.userObject.uploadChangedProfile()
	}

	uploadProfileImage(url) {
		return this.getFile(url, "image/png").then((file) => {
			const upload = new ImageUpload(file, imageUploadOptions)

			return upload.prepare().then(({ lowest }) =>
				upload.upload().thenReturn(lowest)
			)
		}).then((imageMeta) => {
			var setImageBlobAttributePromise = this.userObject.setProfileAttribute("imageBlob", {
				blobid: imageMeta.meta.blobID,
				imageHash: imageMeta.content.blobHash
			});

			this.userObject.removeProfileAttribute("image");

			return setImageBlobAttributePromise
		}).then(() => {
			return this.userObject.uploadChangedProfile()
		})
	}

	avatarClicked() {
		this.actionSheetCtrl.create({
			buttons: [{
				icon: !this.platform.is("ios") ? "eye": null,
				text: this.translate.instant("profile.image.view"),
				handler: () => {
					const { blobid } = this.userObject.getProfileAttribute("imageBlob")
					console.log("view image")

					return blobService.getBlobUrl(blobid).then((url) => {
						this.photoViewer.show(url);
					});
				}
			}, {
				icon: !this.platform.is("ios") ? "camera": null,
				text: this.translate.instant("profile.image.takePhoto"),
				handler: () => {
					this.camera.getPicture(CameraOptions).then((url) => {
						return this.uploadProfileImage(url)
					})
				}
			}, {
				icon: !this.platform.is("ios") ? "image": null,
				text: this.translate.instant("profile.image.selectPhoto"),
				handler: () => {
					Bluebird.resolve(this.imagePicker.getPictures(ImagePickerOptions)).map((result: any) => {
						return this.uploadProfileImage(result)
					})
				}
			}, {
				text: this.translate.instant("profile.image.removeButtonText"),
				role: "destructive",
				icon: !this.platform.is("ios") ? "trash" : null,
				handler: () => {
					this.alertCtrl.create({
						title: this.translate.instant("profile.image.removeTitle"),
						message: this.translate.instant("profile.image.removeQuestion"),
						buttons: [{
							text: this.translate.instant("general.cancel"),
							role: "cancel"
						}, {
							text: this.translate.instant("profile.image.removeConfirmButtonText"),
							role: "destructive",
							cssClass: "alert-button-danger",
							handler: () => {
								this.removeProfileImage()
							}
						}]
					}).present();
				}
			}, {
				text: this.translate.instant("general.cancel"),
				role: "cancel",
				icon: !this.platform.is("ios") ? "close" : null
			}]
		}).present();
	}

	report = () => {
		const reportConfirm = this.alertCtrl.create({
			title: this.translate.instant("profile.contacts.reportConfirm.title"),
			message: this.translate.instant("profile.contacts.reportConfirm.message"),
			buttons: [{
				text: this.translate.instant("profile.contacts.reportConfirm.cancel")
			}, {
				text: this.translate.instant("profile.contacts.reportConfirm.confirm"),
				handler: () => {
					reportService.sendReport("user", this.user.id);
					this.removeBlockedUser()
				}
			}]
		});

		reportConfirm.setCssClass('logout-confirm');
		reportConfirm.present();
	}

	reportAndBlock = () => {
		if(this.isBlocked()) {
			return
		}

		const reportAndBlockConfirm = this.alertCtrl.create({
			title: this.translate.instant("profile.contacts.reportAndBlockConfirm.title"),
			message: this.translate.instant("profile.contacts.reportAndBlockConfirm.message"),
			buttons: [{
				text: this.translate.instant("profile.contacts.reportAndBlockConfirm.cancel")
			}, {
				text: this.translate.instant("profile.contacts.reportAndBlockConfirm.confirm"),
				handler: () => {
					reportService.sendReport("user", this.user.id);
					settings.setBlockedUsers([...settings.getBlockedUsers(), { id: this.userId, since: Date.now() }])
					this.removeBlockedUser()
				}
			}]
		});

		reportAndBlockConfirm.setCssClass('logout-confirm');
		reportAndBlockConfirm.present();
	}

	close = () => {
		this.navCtrl.setRoot("Home");
	}
}
