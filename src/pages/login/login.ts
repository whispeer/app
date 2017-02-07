import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import loginService from "../../assets/services/login.service";

import jQuery from "jquery";

/*
	Generated class for the Login page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	login: typeof loginService;

	passwordRepeat: string = "";

	register: boolean = false;
	usernameUsed: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.login = loginService;

		loginService.loadedStorage.then(() => {
			if (loginService.identifier) {
				jQuery("#password input").focus();
			} else {
				jQuery("#mail input").focus();
			}
		});
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad LoginPage");
	}

	loginOrRegister = () => {
		loginService.login();
	}
}
