import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from "../home/home";

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
	register: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.username = localStorage.getItem("username");
		this.password = localStorage.getItem("password");

		if(this.username && this.password) {
			this.nextStep();
		}
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad LoginPage");
	}

	nextStep = () => {
		if(this.username === "test" && this.password === "1234") {
			localStorage.setItem("username", this.username);
			localStorage.setItem("password", this.password);

			this.navCtrl.setRoot(HomePage);
		}

		if(!this.register) {
			this.register = true;
		}
	}
}
