import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from "../../assets/services/user.service";

/*
	Generated class for the Friends page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-friends',
	templateUrl: 'friends.html'
})
export class FriendsPage {
	friends: any[] = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FriendsPage');
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

			this.friends = friends;
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

}
