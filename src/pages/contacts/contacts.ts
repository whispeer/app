import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ContactRequestsPage } from "../contact-requests/contact-requests";
import { ProfilePage } from "../profile/profile";

import { HomePage } from "../home/home";

const friendsService = require("../../assets/services/friendsService");
const userService = require("../../assets/user/userService");

import * as Bluebird from 'bluebird';

@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})
export class ContactsPage {
	friends: any[] = [];
	friendsLoading: boolean = true;
	requests: any[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	private loadFriendsUsers = () => {
		this.requests = friendsService.getRequests();

		return Bluebird.try(() => {
			var friends = friendsService.getFriends();
			return userService.getMultipleFormatted(friends);
		}).then((result: any[]) => {
			return result.sort((a: any, b: any): number => {
				const firstAvailable = a.names.firstname && b.names.firstname;
				const lastAvailable = a.names.lastname && b.names.firstname;

				if(!firstAvailable && !lastAvailable) {
					return a.name.localeCompare(b.name);
				} else if (!firstAvailable) {
					return a.names.lastname.localeCompare(b.names.lastname);
				} else {
					return a.names.firstname.localeCompare(b.names.firstname);
				}
			});
		}).then((result: any[]) => {
			this.friends = result;
			this.friendsLoading = false;
		});
	}

	ionViewDidLoad() {
		friendsService.awaitLoading().then(() => {
			friendsService.listen(this.loadFriendsUsers);
			this.loadFriendsUsers();
		});

		console.log('ionViewDidLoad FriendsPage');
	}

	friendDividers = (record, recordIndex, records) => {
		const firstChar: string = record.name[0];

		if(recordIndex === 0) {
			return firstChar.toUpperCase();
		}

		if(firstChar.toLowerCase() !== records[recordIndex - 1].name[0].toLowerCase()) {
			return firstChar.toUpperCase();
		}

		return null;
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
