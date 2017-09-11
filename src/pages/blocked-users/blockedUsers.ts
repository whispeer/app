import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

const contactsService = require("../../lib/services/friendsService")
const initService = require("../../lib/services/initService")
import userService from "../../lib/users/userService"

import settings from "../../lib/services/settings.service"

import { ContactsWithSearch } from '../../lib/contacts/contactsWithSearch'
@IonicPage({
	name: "Blocked Users",
	segment: "blockedusers"
})
@Component({
	selector: 'blocked-users',
	templateUrl: 'blockedUsers.html'
})
export class BlockedUsersPage extends ContactsWithSearch {

	constructor(private navCtrl: NavController) {
		super()
	}

	ionViewDidLoad() {
		initService.awaitLoading()
			.then(() => userService.getMultipleFormatted(settings.getBlockedUsers().map(({ id }) => id)))
			.then((users) => ContactsWithSearch.sort(users))
			.then((users) => {
				this.contacts = users
				this.contactsLoading = false
			})
	}

	goToUser(userId) {
		this.navCtrl.push("Profile", {
			userId: userId
		})
	}

	close = () => {
		this.navCtrl.setRoot("Home");
	}
}
