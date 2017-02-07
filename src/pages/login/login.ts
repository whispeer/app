import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from "../home/home";

import loginService from "../../assets/services/login.service";

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
	username: string = "";
	password: string = "";
	passwordRepeat: string = "";

	register: boolean = false;
	usernameUsed: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		loginService.loadedStorage.then(() => {
			console.log("loaded storage");
		});

		this.username = localStorage.getItem("username");
		this.password = localStorage.getItem("password");

		if(this.username && this.password) {
			this.nextStep(true);
		}
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad LoginPage");
	}

	nextStep = (noRegister?: boolean) => {
		noRegister = noRegister || false;

		if(this.username && this.password) {
			if(this.username === "test" && this.password === "1234") {
				this.doLogin();
			} else if(!this.register && !noRegister) {
				this.register = true;
			} else if(this.password === this.passwordRepeat) {
				this.doRegister();
			}
		}
	}

	doRegister = () => {
		// register and then login...
		this.doLogin();
	}

	doLogin = () => {
		localStorage.setItem("username", this.username);
		localStorage.setItem("password", this.password);

		this.navCtrl.setRoot(HomePage);
	}
}
