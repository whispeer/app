import { Component, Output, EventEmitter } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

const friendsService = require("../lib/services/friendsService");

import { ContactsWithSearch } from '../lib/contacts/contactsWithSearch'
import { TranslateService } from '@ngx-translate/core';

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
	ios: boolean = false;

	@Output() chooseReceivers = new EventEmitter();

	constructor(public navCtrl: NavController, private translate: TranslateService, private platform: Platform) {
		super()

		this.ios = platform.is("ios")
	}

	ngOnInit() {
		friendsService.awaitLoading().then(() => {
			friendsService.listen(this.loadContactsUsers);
			this.loadContactsUsers().then(() => {
				this.contactsLoading = false
			});
		});
	}

	addSelectedUser = (user) => {
		if (this.selectedUsers.indexOf(user) === -1) {
			this.selectedUsers.push(user);
		}

		this.selectedUserMap[user.id] = true
	}

	removeSelectedUser = (user) => {
		h.removeArray(this.selectedUsers, user);

		delete this.selectedUserMap[user.id]
	}

	updateSelectedUsers = (user) => {
		if (this.selectedUserMap[user.id]) {
			this.removeSelectedUser(user);
		} else {
			this.addSelectedUser(user);
		}
	}

	create = () => {
		this.chooseReceivers.emit(this.selectedUsers);
	}

	close = () => {
		this.navCtrl.pop();
	}

}
