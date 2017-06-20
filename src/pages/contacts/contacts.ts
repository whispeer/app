import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Searchbar } from 'ionic-angular';

const contactsService = require("../../lib/services/friendsService");

import { ContactsWithSearch } from '../../lib/contacts/contactsWithSearch'
import { TranslateService } from '@ngx-translate/core';

@IonicPage({
	name: "Contacts",
	segment: "contacts"
})
@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})
export class ContactsPage extends ContactsWithSearch {

	@ViewChild(Searchbar) searchBar: Searchbar;

	requests: any[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService) {
		super()
	}

	ionViewDidEnter() {
		if (this.navParams.get("search")) {
			setTimeout(() => {
				this.searchBar.setFocus()
			})
		}
	}

	ionViewDidLoad() {
		contactsService.awaitLoading().then(() => {
			this.requests = contactsService.getRequests()

			contactsService.listen(() => {
				this.requests = contactsService.getRequests()
				this.loadContactsUsers()
			});
			return this.loadContactsUsers().then(() => {
				this.contactsLoading = false;
			});
		})
	}

	get requestsLabel() {
		const count = this.requests.length > 1 ? "many" : "single"

		return this.translate.instant(`home.newContact.${count}`)
	}

	goToUser(userId) {
		this.navCtrl.push("Profile", {
			userId: userId
		})
	}

	goToRequests() {
		this.navCtrl.push("Requests");
	}

	close = () => {
		this.navCtrl.setRoot("Home");
	}
}
