import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from "../../assets/services/user.service";

import { MessagesPage } from "../messages/messages";

const friendsService = require("../../assets/services/friendsService");
const userService = require("../../assets/user/userService");

import * as Bluebird from 'bluebird';

/*
	Generated class for the NewMessage page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-new-message',
	templateUrl: 'new-message.html'
})
export class NewMessagePage {
	friends: any[];
	searchTerm: string = "";
	selectedUsers: any = {};

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NewMessagePage');
	}

	ngOnInit() {
		friendsService.awaitLoading().then(() => {
			friendsService.listen(this.loadFriendsUsers);
			this.loadFriendsUsers();
		});
	}

	private loadFriendsUsers = () => {
		return Bluebird.try(() => {
			var friends = friendsService.getFriends().slice(0, 10);
			return userService.getMultipleFormatted(friends);
		}).then((result) => {
			console.warn("Friends loaded");
			this.friends = result;
		});
	}

	getFriendsResults = () => {
		const friends = this.getFilteredFriends();

		friends.sort((a: any, b: any) => {
			if (this.selectedUsers[a.id] && !this.selectedUsers[b.id]) {
				return -1;
			}

			if (this.selectedUsers[b.id] && !this.selectedUsers[a.id]) {
				return 1;
			}

			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}

			if (nameA > nameB) {
				return 1;
			}

			// names must be equal
			return 0;
		});

		return friends;
	}

	getFilteredFriends = () => {
		if (!this.friends) {
			return [];
		}

		if (!this.searchTerm) {
			return this.friends;
		}

		return this.friends.filter((friend) => {
			return friend.name.indexOf(this.searchTerm) > -1
		});
	}

	create = () => {
		this.navCtrl.push(MessagesPage);
	}
}
