import { Component } from "@angular/core";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController, NavParams, AlertController, IonicPage } from "ionic-angular";
import { TranslateService } from '@ngx-translate/core';
import { PhotoViewer } from '@ionic-native/photo-viewer'

import Bluebird from "bluebird";
const qr = require("qrious/dist/qrious.js");

import Tutorial from "../../app/tutorial";
import sessionService from "../../lib/services/session.service";
import settings from "../../lib/services/settings.service"
import userService from "../../lib/users/userService";

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
	version = { version: `${CLIENT_INFO.version}-${CLIENT_INFO.commit}` }

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

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private translate: TranslateService, private iab: InAppBrowser, private photoViewer: PhotoViewer) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

	pushWarning() {
		this.pushEnabled = true;
		alert(this.translate.instant("settings.pushAlert"));
	}

	generateBackup() {
		let image
		let keyData

		Bluebird.resolve(
			confirm(this.translate.instant("settings.backup.confirm"))
		).then((answer) => {
			if(!answer) {
				return Bluebird.reject(false)
			}
		}).then(() =>
			userService.getOwn().createBackupKey()
		).then((_keyData) => {
			keyData = _keyData;

			return new Bluebird((resolve) => {
				image = new Image(100, 200);

				image.onload = resolve;

				new qr({
					element: image,
					value: keyData,
					size: 175, // old was 7 and internally multiplied by 25
					level: "L"
				});
			});
		}).then((): string => {
			var c = document.createElement("canvas");
			c.width = image.width + 200;
			c.height = image.height + 200;

			var ctx = c.getContext("2d");

			ctx.fillStyle = "white";
			ctx.fillRect(0,0,c.width,c.height);

			ctx.drawImage(image,0,0);

			ctx.fillStyle = "black";
			ctx.font="20px Arial";
			ctx.fillText(keyData.substr(0, 26), 10, image.height + 50);
			ctx.fillText(keyData.substr(26), 10, image.height + 75);

			ctx.fillText("whispeer-Passwort vergessen?", 10, image.height + 125);
			ctx.fillText("https://whilogispeer.de/recovery", 10, image.height + 150);

			return c.toDataURL()
		}).then((url: string) => {
			this.photoViewer.show(URL.createObjectURL(url))
		})
	}

	goBack() {
		this.navCtrl.pop();
	}

	logout() {
		let logoutConfirm = this.alertCtrl.create({
			title: this.translate.instant("settings.logout"),
			message: this.translate.instant("settings.logoutWarning"),
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{ text: 'Logout',
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
