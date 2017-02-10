import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from "../profile/profile";

const friendsService = require("../../assets/services/friendsService");
const userService = require("../../assets/user/userService");

import * as Bluebird from 'bluebird';

@Component({
	selector: 'page-contact-requests',
	templateUrl: 'contact-requests.html'
})
export class ContactRequestsPage {
	requests: any[] = [];
	requestsLoading: boolean = true;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	loadRequestsUsers = () => {
		return Bluebird.try(() => {
			var requests = friendsService.getRequests();

			return userService.getMultipleFormatted(requests);
		}).then((result) => {
			this.requests = result;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ContactRequestsPage');

		friendsService.awaitLoading().then(() => {
			friendsService.listen(this.loadRequestsUsers);
			this.loadRequestsUsers();

			this.requestsLoading = false;
		});
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

	checkRequest(userId) {
		this.navCtrl.push(ProfilePage, {
			userId: userId
		})
	}
}
