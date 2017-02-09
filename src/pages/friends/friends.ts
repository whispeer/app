import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FriendRequestsPage } from "../friend-requests/friend-requests";
import { ProfilePage } from "../profile/profile";

const friendsService = require("../../assets/services/friendsService");
const userService = require("../../assets/user/userService");

import * as Bluebird from 'bluebird';

@Component({
	selector: 'page-friends',
	templateUrl: 'friends.html'
})
export class FriendsPage {
	friends: any[] = [];
	friendsLoading: boolean = true;
	requests: any[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	private loadFriendsUsers = () => {
		this.requests = friendsService.getRequests();

		return Bluebird.try(() => {
			var friends = friendsService.getFriends();
			return userService.getMultipleFormatted(friends);
		}).then((result) => {
			this.friends = result;
			this.friendsLoading = false;
		});
	}

	ionViewDidLoad() {
		friendsService.awaitLoading().then(() => {
			friendsService.listen(this.loadFriendsUsers);
			this.loadFriendsUsers();
		});

		console.log('ionViewDidLoad FriendsPage');
	}

	friendDividers = (record, recordIndex, records) => {
		const firstChar: string = record.name[0];

		if(recordIndex === 0) {
			return firstChar.toUpperCase();
		}

		if(firstChar.toLowerCase() !== records[recordIndex - 1].name[0].toLowerCase()) {
			return firstChar.toUpperCase();
		}

		return null;
	}

	goToUser(userId) {
		this.navCtrl.push(ProfilePage, {
			userId: userId
		})
	}

	goToRequests() {
		this.navCtrl.push(FriendRequestsPage);
	}

}
