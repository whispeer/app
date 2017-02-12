import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { HomePage } from "../home/home";

import sessionService from "../../assets/services/session.service";

/*
	Generated class for the Settings page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})
export class SettingsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

	goBack() {
		this.navCtrl.pop();
	}

	logout() {
		sessionService.logout();
	}

	tos() {
		window.open("https://whispeer.de/en/agb", "_system");
	}

	privacyPolicy() {
		window.open("https://whispeer.de/en/privacyPolicy", "_system");
	}

	contactUs() {
		window.open("https://whispeer.de/en/contact", "_system");
	}

	close = () => {
		this.navCtrl.setRoot(HomePage);
	}
}
