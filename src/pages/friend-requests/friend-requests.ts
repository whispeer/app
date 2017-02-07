import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from "../../assets/services/user.service";

import { ProfilePage } from "../profile/profile";
/*
	Generated class for the FriendRequests page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-friend-requests',
	templateUrl: 'friend-requests.html'
})
export class FriendRequestsPage {
	requests: any[] = [];
	requestsLoading: boolean = true;

	constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FriendRequestsPage');
		this.userService.getUsers().then((friends: any[]) => {
			friends.sort((a: any, b: any) => {
				const nameA: string = a.name.toLowerCase();
				const nameB: string = b.name.toLowerCase();

				if (nameA < nameB) {
					return -1;
				}

				if (nameA > nameB) {
					return 1;
				}

				return 0;
			});

			this.requests = [friends[1], friends[2]];
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
