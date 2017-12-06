import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core'

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
export class BlockedUsersPage {
	contacts: any[] = []
	contactsLoading: boolean = true

	constructor(private navCtrl: NavController, translate: TranslateService) {}

	load() {
		if (settings.getBlockedUsers().length === 0) {
			//TODO remove this view from history
			const views = this.navCtrl.getViews().filter(({ component }) => component === BlockedUsersPage)
			views.forEach((view) => this.navCtrl.removeView(view))
		}

		return userService.getMultipleFormatted(settings.getBlockedUsers().map(({ id }) => id))
			.then((users) => ContactsWithSearch.sort(users))
			.then((users) => {
				this.contacts = users
				this.contactsLoading = false
			})
	}

	ionViewDidLoad() {
		initService.awaitLoading().then(() => this.load())

		settings.listen(() => this.load(), "updated")
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
