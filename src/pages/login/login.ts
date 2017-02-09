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

	getMessage() {
		console.log('before', this.login);
		console.log('after', this.login);
		return CALL_TO_ACTION_PROCESS
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad LoginPage");
	}

	checkUserNameExistance = () => {
		console.log('checking username')
		loginService.login();
		console.log('result', loginService)
		// this.login.login();
	}

	loginOrRegister = () => {
		if (this.usernameUsed) {
			loginService.login();
			return;
		}

		this.register = true;
	}
}

const CALL_TO_ACTION_PROCESS = "Create a new account or simply login..."
const AMBUGUOUS_PROCESS = "This username exists. You can choose to continue login or register a distinct username here"
const LOGIN_PROCESS_SUCCESS = "Success! We'll log you in securely now..."

