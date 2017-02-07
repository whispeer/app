import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import sessionService from '../../assets/services/session.service';

var userService = require("user/userService");

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

	userObject: any;
	// this should be my own id by default @Nilos!
	userId: number;

	isRequest: boolean;
	isOwn: boolean;

	fingerprint: string[];

	view: string = "profile";

	profileLoading: boolean = true;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

	ngOnInit() {
		this.userId = parseFloat(this.navParams.get("userId"));

		this.isOwn = this.userId === sessionService.userid;
		this.isRequest = false;

		userService.get(this.userId).then((user) => {
			if (user.isNotExistingUser()) {
				this.user = user.data;
				this.profileLoading = false;
				return;
			}

			this.userObject = user;

			var fp = user.getFingerPrint();
			this.fingerprint = [fp.substr(0,13), fp.substr(13,13), fp.substr(26,13), fp.substr(39,13)];

			return user.loadFullData();
		}).then(() => {
			this.user = this.userObject.data;

			this.profileLoading = false;
		});
	}

	goBack() {
		this.navCtrl.pop();
	}

	acceptRequest() {}

	declineRequest() {}
}
