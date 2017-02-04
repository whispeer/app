import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from "../../assets/services/user.service";

/*
	Generated class for the Profile page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage {
	user: any = {
		basic: {}
	};

	fingerprint: string[];

	view: string = "profile";

	constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

	ngOnInit() {
		this.userService.getUsers().then((users: any[]) => {
			this.user = users[0];

			const fp = this.user.fingerprint;
			this.fingerprint = [[fp.substr(0,13), fp.substr(13,13)].join(" - "), [fp.substr(26,13), fp.substr(39,13)].join(" - ")];
		});
	}

	goBack() {
		this.navCtrl.pop();
	}
}
