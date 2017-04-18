import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { ContactRequestsPage } from "../contact-requests/contact-requests";
import { ProfilePage } from "../profile/profile";

const contactsService = require("../../assets/services/friendsService");

import { ContactsWithSearch } from '../../assets/contacts/contactsWithSearch'

@IonicPage({
	name: "Contacts",
	segment: "contacts"
})
@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})
export class ContactsPage extends ContactsWithSearch {

	requests: any[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		super()
	}

	ionViewDidLoad() {
		contactsService.awaitLoading().then(() => {
			this.requests = contactsService.getRequests()

			contactsService.listen(() => {
				this.requests = contactsService.getRequests()
				this.loadContactsUsers()
			});
			return this.loadContactsUsers();
		});
	}

	get requestsLabel() {
		return this.requests.length > 1 ? 'New contact requests' : 'New contact request'
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
