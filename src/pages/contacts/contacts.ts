import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Searchbar } from 'ionic-angular';

import { ContactsWithSearch } from '../../lib/contacts/contactsWithSearch'
import { TranslateService } from '@ngx-translate/core';

import { isBusinessVersion } from "../../lib/services/location.manager"

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

	business = isBusinessVersion()

	constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
		super(translate)
	}

	getContacts = () => {
		return this.getUsers()
	}

	ionViewDidEnter() {
		if (this.navParams.get("search")) {
			setTimeout(() => {
				this.searchBar.setFocus()
			})
		}
	}

	ionViewDidLoad() {
		this.init()
	}

	get requestsLabel() {
		const count = this.requests.length > 1 ? "many" : "single"

		return this.translate.instant(`home.newContact.${count}`)
	}

	handleSearchKey = (event) => {
		if(event.keyCode === 13) {
			event.target.blur();
		}
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
