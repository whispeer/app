import { Component } from "@angular/core";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController, NavParams, AlertController, IonicPage } from "ionic-angular";
import { TranslateService } from '@ngx-translate/core';
import { PhotoViewer } from '@ionic-native/photo-viewer'

import Bluebird from "bluebird";
// yep this looks weird. importing / requireing this
// by module name did not resolve to the right path somehow
const qr = require("qrious/dist/qrious.js");

import Tutorial from "../../app/tutorial";
import sessionService from "../../lib/services/session.service";
import settings from "../../lib/services/settings.service"
import userService from "../../lib/users/userService";
import settingsService from "../../lib/services/settings.service";

@IonicPage({
	name: "Settings",
	segment: "settings"
})
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})
export class SettingsPage {
	pushEnabled = true;
	tutorialPassed = true;
	savingSettings = false;
	version = { version: `${CLIENT_INFO.version}-${CLIENT_INFO.commit}` }
	haveFriendsAccess = false

	tutorialVisible() {
		return Tutorial.tutorialVisible
	}

	hasBlocked = () => settings.getBlockedUsers().length > 0

	resetTutorial({ checked }) {
		if (!checked) return;
		Tutorial.resetVisibility()
		try {
			this.goBack();
		} catch(e) {
			console.log('Something went wrong when exiting settings')
		}
	}

	loadSettings = () => this.haveFriendsAccess = settingsService.getBranch("friendsAccess")

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private translate: TranslateService, private iab: InAppBrowser, private photoViewer: PhotoViewer) {
		this.loadSettings()
		settingsService.listen(() => this.loadSettings(), "updated")
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

	pushWarning() {
		this.pushEnabled = true;
		alert(this.translate.instant("settings.pushAlert"));
	}

	setFriendsAccess = ($event) => {
		if ($event.checked === settingsService.getBranch("friendsAccess")) {
			return
		}

		settingsService.updateBranch("friendsAccess", $event.checked)

		this.savingSettings = true

		settingsService.uploadChangedData()
			.catch((e) => {
				console.error(e)
				settingsService.updateBranch("friendsAccess", !$event.checked)
				alert(this.translate.instant("settings.saveError"))
			})
			.finally(() => this.savingSettings = false)
	}

	startBackup() {
		let backupConfirm = this.alertCtrl.create({
			title: this.translate.instant("settings.backup.title"),
			message: this.translate.instant("settings.backup.message"),
			buttons: [
				{ text: this.translate.instant("settings.backup.cancel"), role: 'cancel'},
				{ text: this.translate.instant("settings.backup.save"), handler: () => { this.generateBackup() } }
			]
		});
		// there seems to be a bug in current ionic, which prevents
		// cssClass properties in options to propagate, instead these have
		// to be set with a subsequent call like this:
		backupConfirm.setCssClass('backup-save');
		backupConfirm.present();
	}

	generateBackup() {
		return Bluebird.try(async () => {
			const keyData = await userService.getOwn().createBackupKey();

			const image: any = await new Bluebird((resolve) => {
				const image = new Image(100, 200);
				image.onload = resolve.bind(null, image);

				new qr({
					element: image,
					value: keyData,
					size: 175, // old was 7 and internally multiplied by 25
					level: "L"
				});
			});

			const c = document.createElement("canvas");
			c.width = image.width + 200;
			c.height = image.height + 200;

			const ctx = c.getContext("2d");

			ctx.fillStyle = "white";
			ctx.fillRect(0,0,c.width,c.height);

			ctx.drawImage(image,0,0);

			ctx.fillStyle = "black";
			ctx.font="20px Arial";
			ctx.fillText(keyData.substr(0, 26), 10, image.height + 50);
			ctx.fillText(keyData.substr(26), 10, image.height + 75);

			ctx.fillText("whispeer-Passwort vergessen?", 10, image.height + 125);
			ctx.fillText("https://whispeer.de/recovery", 10, image.height + 150);

			this.photoViewer.show(c.toDataURL())
		})
	}

	goBack() {
		this.navCtrl.pop();
	}

	logout() {
		let logoutConfirm = this.alertCtrl.create({
			title: this.translate.instant("settings.logout.title"),
			buttons: [
				{ text: this.translate.instant("settings.logout.cancel"), role: 'cancel' },
				{ text: this.translate.instant("settings.logout.logout"),
					handler: () => sessionService.logout() }
			]
		});
		// there seems to be a bug in current ionic, which prevents
		// cssClass properties in options to propagate, instead these have
		// to be set with a subsequent call like this:
		logoutConfirm.setCssClass('logout-confirm');
		logoutConfirm.present();
	}

	showBlocked() {
		this.navCtrl.push("Blocked Users")
	}

	feedback() {
		this.navCtrl.push("New Message", {
			receiverIds: "3317"
		});
	}

	tos() {
		this.iab.create("https://whispeer.de/en/agb", "_blank");
	}

	privacyPolicy() {
		this.iab.create("https://whispeer.de/en/privacyPolicy", "_blank");
	}

	contactUs() {
		this.iab.create("https://whispeer.de/en/contact", "_blank");
	}

	close = () => {
		this.navCtrl.setRoot("Home");
	}
}
