import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MessagesPage } from "../pages/messages/messages";

const friendsService = require("../assets/services/friendsService");
const userService = require("../assets/user/userService");
const messageService = require("../assets/messages/messageService");

import { ContactsWithSearch } from '../assets/contacts/contactsWithSearch'

import * as Bluebird from 'bluebird';

const h = require("whispeerHelper");

@Component({
	selector: 'chooseFriends',
	templateUrl: 'chooseFriends.html'
})
export class chooseFriends extends ContactsWithSearch {
	friends: any[];
	searchTerm: string = "";
	selectedUserMap: any = {};
	selectedUsers: any[] = [];

	@Output() chooseReceivers = new EventEmitter();
	@Input() receiverString;

	constructor(public navCtrl: NavController) {
		super()
	}

	ngOnInit() {
		if (this.receiverString) {
			return userService.getMultipleFormatted(this.receiverString.split(",")).then((users) => {
				this.send(users);
			})
		}

		friendsService.awaitLoading().then(() => {
			friendsService.listen(this.loadContactsUsers);
			this.loadContactsUsers();
		});
	}

	addSelectedUser = (user) => {
		if (this.selectedUsers.indexOf(user) === -1) {
			this.selectedUsers.push(user);
		}
	}

	removeSelectedUser = (user) => {
		h.removeArray(this.selectedUsers, user);
	}

	updateSelectedUsers = (user) => {
		if (this.selectedUserMap[user.id]) {
			this.addSelectedUser(user);
		} else {
			this.removeSelectedUser(user);
		}
	}

	getContactsWithSelected = () => {
		const users = this.getUsers();

		return this.selectedUsers.concat(users);
	}

	contactDividersWithSelected = (record, recordIndex, records) => {
		const selectedLength = this.selectedUsers.length;

		if (recordIndex < selectedLength) {
			if (recordIndex === 0) {
				return "Selected";
			}

			return null;
		}

		return this.contactDividers(record, recordIndex - selectedLength, records.slice(selectedLength));
	}

	private sendToUserTopic(users) {
		if (users.length > 1) {
			return Bluebird.resolve();
		}

		return messageService.getUserTopic(users[0].id);

	}

	send = (users) => {
		this.sendToUserTopic(users).then((topicId) => {
			if (topicId) {
				this.navCtrl.push(MessagesPage, { topicId: topicId });
			}

			this.chooseReceivers.emit(users);
		});
	}

	create = () => {
		this.send(this.selectedUsers);
	}

	close = () => {
		this.navCtrl.pop();
	}

}
