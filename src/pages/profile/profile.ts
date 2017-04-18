import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, AlertOptions, Platform } from 'ionic-angular';
import sessionService from '../../assets/services/session.service';
import * as Bluebird from 'bluebird';

import { HomePage } from "../home/home";
import { NewMessagePage } from "../new-message/new-message";

const userService = require("user/userService");
const friendsService = require("../../assets/services/friendsService");

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage {
	user: any = {
		basic: {},
		names: {},
		advanced: {}
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

	constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, private platform: Platform) {}

	ngOnInit() {
		this.userId = parseFloat(this.navParams.get("userId"));
		this.isOwn = true;

		const awaitFriendsService = friendsService.awaitLoading().then(() => {
			var requests = friendsService.getRequests();
			this.isRequest = requests.indexOf(this.userId) > -1

			this.isOwn = this.userId === parseFloat(sessionService.userid);

			this.isRequestable = friendsService.noRequests(this.userId) && !this.isOwn;
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

			var fp = user.getFingerPrint();
			this.fingerprint = [fp.substr(0,13), fp.substr(13,13), fp.substr(26,13), fp.substr(39,13)];

			return user.loadFullData().thenReturn(user);
		}).then((user) => {
			this.userObject = user;
			this.user = this.userObject.data;

			this.profileLoading = false;
		});
	}

	attributeSet(val) {
		if (Array.isArray(val)) {
			return val.length > 0;
		}

		if (typeof val === "object") {
			return Object.keys(val).length > 0;
		}

		return val;
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

	writeMessage() {
		this.navCtrl.push(NewMessagePage, { receiverIds: this.user.id });
	}

	contactOptions() {
		this.actionSheetCtrl.create({
			buttons: [{
				text: "Remove from Contacts",
				role: "destructive",
				icon: !this.platform.is("ios") ? "trash" : null,
				handler: () => {
					this.alertCtrl.create(<AlertOptions>{
						title: "Remove Contact",
						message: "Are you sure that you want to remove this Contact?",
						buttons: [{
							text: "Cancel",
							role: "cancel"
						}, {
							text: "Remove",
							role: "destructive",
							cssClass: "alert-button-danger",
							handler: () => {
								this.user.user.removeAsFriend();
							}
						}]
					}).present();
				}
			}]
		}).present();
	}

	close = () => {
		this.navCtrl.setRoot(HomePage);
	}
}
