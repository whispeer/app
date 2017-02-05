import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { LoginPage } from "../login/login";

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
		localStorage.clear();
		this.navCtrl.setRoot(LoginPage);
	}

}
