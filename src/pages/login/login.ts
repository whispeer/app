import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { StatusBar } from "@ionic-native/status-bar";

import sessionService from '../../lib/services/session.service';
import { failureCodes } from "../../lib/services/login.service";
import loginService from "../../lib/services/login.service";
import passwordStrengthService from '../../lib/services/passwordStrength.service'

const registerService = require('../../lib/services/registerService');
import whispeerHelper from "../../lib/helper/helper"

import { TranslateService } from '@ngx-translate/core';

import { isBusinessVersion, goToPrivateHome, goToBusinessVersion } from '../../lib/services/location.manager'

const focusSelector = (selector) => {
	const e = document.querySelector(selector)

	if (e) {
		e.focus()
	}
}

@IonicPage({
	name: "Login",
	segment: "login"
})
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	login: typeof loginService;
	passwordRepeat: string = "";

	usernameState: number = USERNAME_UNKNOWN;

	tutorialDisabled = true;

	business = isBusinessVersion();

	constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar, private translate: TranslateService) {
		this.statusBar.styleDefault();

		this.login = loginService;
		loginService.loadedStorage.then(() => {
			this.checkUserNameExistance();
			(loginService.identifier
				? focusSelector("#password input")
				: focusSelector("#mail input"))
		});
	}

	goToOtherHome() {
		if (this.business) {
			goToPrivateHome()
		} else {
			goToBusinessVersion()
		}
	}

	ionViewCanEnter(): boolean {
		return !sessionService.loggedin
	}

	private mainPage() {
		this.navCtrl.remove(0, this.navCtrl.length() - 1)
		this.navCtrl.setRoot("Home")
	}

	getTranslation(key) {
		return this.translate.instant(`login.${key}`)
	}

	getMessage() {
		switch (this.usernameState) {
			case USERNAME_TAKEN:
				return this.getTranslation("messages.ambiguousProcess");
			case USERNAME_FREE:
				return this.getTranslation("messages.registerMessage");
			case USERNAME_INVALID:
				return this.getTranslation("messages.invalidUsername");
			case USERNAME_LOGIN_SUCCESS:
				return this.getTranslation("messages.loginSuccess");
			case USERNAME_REGISTER_SUCCESS:
				return this.getTranslation("messages.registerSuccess");
			case USERNAME_NO_CONNECTION:
				return this.getTranslation("messages.noConnection");
			case USERNAME_LOGIN_INCORRECT_PASSWORD:
				return this.getTranslation("messages.incorrectPassword");
			case USERNAME_PASSWORDS_DONT_MATCH:
				return this.getTranslation("messages.passwordsDontMatch");
			case USERNAME_PASSWORD_TOO_SHORT:
				return this.getTranslation("messages.passwordTooShort");
			case USERNAME_LOGIN_ERROR:
			case USERNAME_REGISTER_ERROR:
				return this.getTranslation("messages.genericErrorMessage");
			case USERNAME_PASSWORD_CONFIRM:
				return this.getTranslation("messages.confirmPassword");

			case USERNAME_EMPTY:
			case USERNAME_UNKNOWN:
			default:
				return this.getTranslation("messages.defaultCallToAction");
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
		if (!nick) {
			this.usernameState = USERNAME_EMPTY;
		} else if (!whispeerHelper.isNickname(nick)) {
			this.usernameState = USERNAME_INVALID;
		} else {
			registerService.nicknameUsed(nick).then((isUsed) => {
				if (this.login.identifier !== nick) {
					return
				}

				this.usernameState = isUsed
					? USERNAME_TAKEN
					: USERNAME_FREE;
			});
		}
	}

	focusInput(id, repeated = false) {
		focusSelector(`#${id} .text-input`)

		if (repeated) {
			return
		}

		setTimeout(() => this.focusInput(id, true), 100)
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

	passwordSet() {
		return Boolean(this.login.password)
	}

	getLoginErrorCode = (error) => {
		switch(error.data.failure) {
			case failureCodes.WRONGPASSWORD:
				return USERNAME_LOGIN_INCORRECT_PASSWORD;
			case failureCodes.NOCONNECTION:
				return USERNAME_NO_CONNECTION;
			case failureCodes.UNKNOWNNAME:
				return USERNAME_FREE;
			default:
				return USERNAME_LOGIN_ERROR;
		}
	}

	passwordToShort = () => {
		return passwordStrengthService.passwordStrength(this.login.password) === 0
	}

	loadLogin = () =>
		sessionService.loadLogin().then(() => {
			this.statusBar.styleLightContent()
			this.mainPage()
		})

	loginOrRegister = () => {
		if ([USERNAME_TAKEN, USERNAME_LOGIN_INCORRECT_PASSWORD, USERNAME_NO_CONNECTION, USERNAME_LOGIN_ERROR].indexOf(this.usernameState) !== -1) {
			if (!this.passwordSet()) {
				this.focusInput("password")
				return;
			}

			// login
			this.performLogin().then(() => {
				this.usernameState = USERNAME_LOGIN_SUCCESS
				return this.loadLogin()
			}).catch((error) => {
				this.usernameState = this.getLoginErrorCode(error);
			})

		} else if ([USERNAME_FREE, USERNAME_PASSWORD_TOO_SHORT, USERNAME_PASSWORDS_DONT_MATCH, USERNAME_REGISTER_ERROR].indexOf(this.usernameState) !== -1) {
			if (!this.passwordSet()) {
				this.focusInput("password")
				return;
			}

			if (this.passwordToShort()) {
				this.usernameState = USERNAME_PASSWORD_TOO_SHORT;

				this.focusInput("password")
				return;
			}

			this.usernameState = USERNAME_PASSWORD_CONFIRM
			this.focusInput("password2")
		} else if ([USERNAME_PASSWORD_CONFIRM].indexOf(this.usernameState) !== -1) {
			const registerError = (e) => {
				console.error(e);
				this.usernameState = USERNAME_REGISTER_ERROR;
			}

			if (this.passwordsMatch()) {
				this.performRegister().then(() => {
					this.usernameState = USERNAME_REGISTER_SUCCESS;

					return this.loadLogin()
				}).catch(registerError);
			} else {
				this.usernameState = USERNAME_PASSWORDS_DONT_MATCH;

				this.focusInput("password")

				this.login.password = "";
				this.passwordRepeat = "";
			}
		}
	}
}

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
const USERNAME_LOGIN_INCORRECT_PASSWORD = 10;
const USERNAME_NO_CONNECTION = 11;
const USERNAME_PASSWORDS_DONT_MATCH = 12;
const USERNAME_PASSWORD_TOO_SHORT = 13;
