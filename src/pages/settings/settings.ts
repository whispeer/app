import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import sessionService from "../../assets/services/session.service";
import { NewMessagePage } from "../../pages/new-message/new-message";
import Tutorial from "../../app/tutorial";

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

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

	pushWarning() {
		this.pushEnabled = true;
		alert("This feature is not ready yet but we are working on it, promise!");
	}

	goBack() {
		this.navCtrl.pop();
	}

	logout() {
		sessionService.logout();
	}

	feedback() {
		this.navCtrl.push(NewMessagePage, {
			receiverIds: "3317"
		});
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
