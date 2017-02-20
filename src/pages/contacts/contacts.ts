import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ContactRequestsPage } from "../contact-requests/contact-requests";
import { ProfilePage } from "../profile/profile";

import { HomePage } from "../home/home";

const friendsService = require("../../assets/services/friendsService");
const userService = require("../../assets/user/userService");
import errorService from "../../assets/services/error.service";

import * as Bluebird from 'bluebird';

const h = require("whispeerHelper");

@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})
export class ContactsPage {
	friends: any[] = [];
	friendsLoading: boolean = true;

	requests: any[] = [];
	searchResults: any[] = [];
	searchResultsLoading: boolean = false;

	searchTerm: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	private loadFriendsUsers = () => {
		this.requests = friendsService.getRequests();

		return Bluebird.try(() => {
			var friends = friendsService.getFriends();
			return userService.getMultipleFormatted(friends.slice(0, 5));
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

		if (this.searchTerm) {
			return null;
		}

		if(recordIndex === 0) {
			return firstChar.toUpperCase();
		}

		if(firstChar.toLowerCase() !== records[recordIndex - 1].name[0].toLowerCase()) {
			return firstChar.toUpperCase();
		}

		return null;
	}

	executeSearch = h.debounce(() => {
		console.log(`searching for ${this.searchTerm}`);

		if (this.searchTerm.length < 3) {
			this.searchResults = [];
		}

		this.searchResultsLoading = true;

		const query = this.searchTerm;
		const friends = friendsService.getFriends();

		userService.query(query).bind(this).filter((user) => {
			return friends.indexOf(user.getID()) === -1;
		}).map(function (user) {
			if (this.searchTerm !== query) {
				return;
			}

			return user.loadBasicData().thenReturn(user);
		}).then(function (users) {
			if (this.searchTerm !== query) {
				return;
			}

			return users.map(function (user) {
				user.loadFullData(errorService.criticalError);
				return user.data;
			});
		}).then((userData) => {
			this.searchResults = userData;
			this.searchResultsLoading = false;
		});
	}, 100)

	getFriends = () =>  {
		if (!this.searchTerm) {
			return this.friends;
		}

		return this.friends.filter((friend) => {
			return friend.name.indexOf(this.searchTerm) > -1;
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
