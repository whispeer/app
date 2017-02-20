import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import sessionService from '../../assets/services/session.service';
import * as Bluebird from 'bluebird';

import { HomePage } from "../home/home";

const userService = require("user/userService");
const friendsService = require("../../assets/services/friendsService");

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage {
	user: any = {
		basic: {},
		names: {}
	};

	userObject: any;
	// this should be my own id by default @Nilos!
	userId: number;

	isRequest: boolean;
	isRequestable: boolean;
	isOwn: boolean;

	fingerprint: string[];

	view: string = "profile";

	profileLoading: boolean = true;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ngOnInit() {
		this.userId = parseFloat(this.navParams.get("userId"));
		this.isOwn = true;

		const awaitFriendsService = friendsService.awaitLoading().then(() => {
			var requests = friendsService.getRequests();
			this.isRequest = requests.indexOf(this.userId) > -1

			this.isRequestable = friendsService.noRequests(this.userId);
		});

		Bluebird.all([
			userService.get(this.userId),
			awaitFriendsService
		]).then(([user]) => {
			if (user.isNotExistingUser()) {
				this.user = user.data;
				this.profileLoading = false;
				return;
			}

			this.isOwn = this.userId === parseFloat(sessionService.userid);

			var fp = user.getFingerPrint();
			this.fingerprint = [fp.substr(0,13), fp.substr(13,13), fp.substr(26,13), fp.substr(39,13)];

			return user.loadFullData().thenReturn(user);
		}).then((user) => {
			this.userObject = user;
			this.user = this.userObject.data;

			this.profileLoading = false;
		});
	}

	goBack() {
		this.navCtrl.pop();
	}

	private addOrAccept() {
		if (this.isRequest) {
			return friendsService.acceptFriendShip(this.userId);
		}

		return friendsService.friendship(this.userId);
	}

	acceptRequest() {
		this.profileLoading = true;

		this.addOrAccept().then(() => {
			this.profileLoading = false;
			this.isRequest = false;
		});
	}

	declineRequest() {
		if (!this.isRequest) {
			this.isRequestable = false;
			return;
		}

		this.profileLoading = true;

		friendsService.ignoreFriendShip(this.userId).then(() => {
			this.profileLoading = false;
			this.isRequest = false;
		});
	}

	close = () => {
		this.navCtrl.setRoot(HomePage);
	}
}
