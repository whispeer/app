import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from "../assets/services/user.service";

import { MessagesPage } from "../pages/messages/messages";

const friendsService = require("../assets/services/friendsService");
const userService = require("../assets/user/userService");
const messageService = require("../assets/messages/messageService");

import * as Bluebird from 'bluebird';

@Component({
	selector: 'chooseFriends',
	templateUrl: 'chooseFriends.html'
})
export class chooseFriends {
	friends: any[];
	searchTerm: string = "";
	selectedUsers: any = {};

	@Output() chooseReceivers = new EventEmitter();

	constructor(public navCtrl: NavController) {}

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

	private sendToUserTopic(users) {
		if (users.length > 1) {
			return Bluebird.resolve();
		}

		return messageService.getUserTopic(users[0].id);

	}

	private getSelectedUsers() {
		return this.friends.filter((friend) => {
			return this.selectedUsers[friend.id];
		})
	}

	create = () => {
		const users = this.getSelectedUsers();

		this.sendToUserTopic(users).then((topicId) => {
			if (topicId) {
				this.navCtrl.push(MessagesPage, { topicId: topicId });
			}

			this.chooseReceivers.emit(users);
		});
	}

}
