import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, IonicPage } from "ionic-angular";
import sessionService from "../../lib/services/session.service";
import Tutorial from "../../app/tutorial";
import blobCache from "../../lib/asset/blobCache"

import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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

	tutorialVisible() {
		return Tutorial.tutorialVisible
	}

	resetTutorial({ checked }) {
		if (!checked) return;
		Tutorial.resetVisibility()
		try {
			this.goBack();
		} catch(e) {
			console.log('Something went wrong when exiting settings')
		}
	}

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private translate: TranslateService, private iab: InAppBrowser) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

	pushWarning() {
		this.pushEnabled = true;
		alert(this.translate.instant("settings.pushAlert"));
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
					handler: () => {
						blobCache.clear().finally(() => sessionService.logout())
					}
				}
			]
		});
		// there seems to be a bug in current ionic, which prevents
		// cssClass properties in options to propagate, instead these have
		// to be set with a subsequent call like this:
		logoutConfirm.setCssClass('logout-confirm');
		logoutConfirm.present();
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
