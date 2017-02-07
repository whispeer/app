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
	// this should be my own id by default @Nilos!
	userId: number;

	isRequest: boolean;
	isOwn: boolean;

	fingerprint: string[];

	view: string = "profile";

	profileLoading: boolean = true;

	constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
		this.userId = parseFloat(this.navParams.get("userId")) || 0;

		this.isRequest = this.userId === 3 || this.userId === 17;
		this.isOwn = this.userId === 0;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

	ngOnInit() {
		this.userService.getUsers().then((users: any[]) => {
			this.user = users[this.userId];

			if(this.isOwn) {
				const fp = this.user.fingerprint;
				this.fingerprint = [[fp.substr(0,13), fp.substr(13,13)].join(" - "), [fp.substr(26,13), fp.substr(39,13)].join(" - ")];
			}

			this.profileLoading = false;
		});
	}

	goBack() {
		this.navCtrl.pop();
	}

	acceptRequest() {}

	declineRequest() {}
}
