import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ContactRequestsPage } from "../contact-requests/contact-requests";
import { ProfilePage } from "../profile/profile";

import { HomePage } from "../home/home";

const contactsService = require("../../assets/services/friendsService");

import { ContactsWithSearch } from '../../assets/contacts/contactsWithSearch'

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

	goToUser(userId) {
		this.navCtrl.push(ProfilePage, {
			userId: userId
		})
	}

	goToRequests() {
		this.navCtrl.push(ContactRequestsPage);
	}

	close = () => {
		this.navCtrl.setRoot(HomePage);
	}
}
