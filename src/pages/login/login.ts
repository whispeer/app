import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import loginService from "../../assets/services/login.service";
import { mainPage } from "../../assets/services/location.manager";
import jQuery from "jquery";

const registerService = require('../../assets/services/registerService');
const whispeerHelper = require('whispeerHelper')

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})

export class LoginPage {

	login: typeof loginService;
	passwordRepeat: string = "";

	usernameState: number = USERNAME_UNKNOWN;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.login = loginService;
		loginService.loadedStorage.then(() => {
			this.checkUserNameExistance();
			(loginService.identifier
				? jQuery("#password input")
				: jQuery("#mail input")).focus();
		});
	}

	getMessage() {
		switch (this.usernameState) {
			case USERNAME_TAKEN:
				return AMBIGUOUS_PROCESS;
			case USERNAME_FREE:
				return REGISTER_MESSAGE;
			case USERNAME_INVALID:
				return INVALID_USERNAME;
			case USERNAME_LOGIN_SUCCESS:
				return LOGIN_SUCCESS;
			case USERNAME_REGISTER_SUCCESS:
				return REGISTER_SUCCESS;
			case USERNAME_LOGIN_ERROR:
			case USERNAME_REGISTER_ERROR:
				return GENERIC_ERROR_MESSAGE;
			case USERNAME_PASSWORD_CONFIRM:
				return CONFIRM_PASSWORD;

			case USERNAME_EMPTY:
			case USERNAME_UNKNOWN:
			default:
				return DEFAULT_CALL_TO_ACTION;
		}
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad LoginPage");
	}

	showPasswordFeld() {
		return !this.showPasswordConfirmationField()
	}

	showPasswordConfirmationField() {
		return [USERNAME_PASSWORD_CONFIRM].indexOf(this.usernameState) !== -1
	}

	checkUserNameExistance = () => {
		const { identifier: nick } = this.login
		if (nick.length === 0) {
			this.usernameState = USERNAME_EMPTY;
		} else if (!whispeerHelper.isNickname(nick)) {
			this.usernameState = USERNAME_INVALID;
		} else {
			registerService.nicknameUsed(nick).then((isUsed) => {
				this.usernameState = isUsed
					? USERNAME_TAKEN
					: USERNAME_FREE;
			});
		}
	}

	performLogin() {
		const { identifier: nick, password: pass } = this.login;
		return loginService.loginServer(nick, pass);
	}

	performRegister() {
		const { identifier: nick, password: pass } = this.login;
		const email = '';
		const defaultSettings = {
			meta: {
				initialLanguage: "en"
			},
			content: {}
		};
		const defaultProfile = {
			pub: {},
			priv: {},
			nobody: {},
			metaData: {
				scope: "always:allfriends"
			}
		};
		return registerService.register(nick, email, pass, defaultProfile, defaultSettings);
	}

	passwordsMatch() {
		return (
			(this.login.password === this.passwordRepeat)
			&& (this.login.password.length !== 0)
		)
	}

	reset() {
		this.login.identifier = '';
		this.login.password = '';
		this.passwordRepeat = '';
		this.checkUserNameExistance();
	}

	loginOrRegister = () => {
		if ([USERNAME_TAKEN, USERNAME_LOGIN_ERROR].indexOf(this.usernameState) !== -1) {

			// login
			this.performLogin().then(() => {
				this.usernameState = USERNAME_LOGIN_SUCCESS
				mainPage()
			}).catch((error) => {
				this.usernameState = USERNAME_LOGIN_ERROR
			})

		} else if ([USERNAME_FREE].indexOf(this.usernameState) !== -1) {

			this.usernameState = USERNAME_PASSWORD_CONFIRM

		} else if ([USERNAME_PASSWORD_CONFIRM].indexOf(this.usernameState) !== -1) {
			const registerError = () => { this.usernameState = USERNAME_REGISTER_ERROR; }

			if (this.passwordsMatch()) {
				this.performRegister().then(() => {
					this.usernameState = USERNAME_REGISTER_SUCCESS;

					this.performLogin().then(() => {
						mainPage()
					}).catch(registerError)

				}).catch(registerError);

			} else { registerError() }

		} else if ([USERNAME_REGISTER_ERROR].indexOf(this.usernameState) !== -1) {

			this.reset();

		}
	}
}

const INVALID_USERNAME = "Please pick another name!"
const DEFAULT_CALL_TO_ACTION = "Create a new account or simply login..."
const AMBIGUOUS_PROCESS = "This username exists. You can choose to continue login or register a distinct username"
const LOGIN_SUCCESS = "Success! We'll log you in securely now..."
const REGISTER_MESSAGE = "This username is free. You can continue to choose a secure password..."
const GENERIC_ERROR_MESSAGE = "Something went wrong."
const CONFIRM_PASSWORD = "Great! Now verify your new password"
const REGISTER_SUCCESS = "Welcome on board! We'll log you in now..."

const USERNAME_UNKNOWN = -1;
const USERNAME_EMPTY = 1;
const USERNAME_INVALID = 2;
const USERNAME_TAKEN = 3;
const USERNAME_FREE = 4;
const USERNAME_LOGIN_ERROR = 5;
const USERNAME_LOGIN_SUCCESS = 6;
const USERNAME_PASSWORD_CONFIRM = 7;
const USERNAME_REGISTER_SUCCESS = 8;
const USERNAME_REGISTER_ERROR = 9;
