import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

const friendsService = require("../lib/services/friendsService");

import { ContactsWithSearch } from '../lib/contacts/contactsWithSearch'

const h = require("whispeerHelper");

@Component({
	selector: 'chooseFriends',
	templateUrl: 'chooseFriends.html'
})
export class ChooseFriends extends ContactsWithSearch {
	friends: any[];
	searchTerm: string = "";
	selectedUserMap: any = {};
	selectedUsers: any[] = [];

	@Output() chooseReceivers = new EventEmitter();

	constructor(public navCtrl: NavController) {
		super()
	}

	ngOnInit() {
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

	create = () => {
		this.chooseReceivers.emit(this.selectedUsers);
	}

	close = () => {
		this.navCtrl.pop();
	}

}
