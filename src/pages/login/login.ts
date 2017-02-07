import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import loginService from "../../assets/services/login.service";

import jQuery from "jquery";

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	login: typeof loginService;

	passwordRepeat: string = "";

	register: boolean = false;
	usernameUsed: boolean = true;

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

	checkUserNameExistance = () => {

	}

	loginOrRegister = () => {
		if (this.usernameUsed) {
			loginService.login();
			return;
		}

		this.register = true;
	}
}
