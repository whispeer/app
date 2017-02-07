import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from "../../assets/services/user.service";

import { MessagesPage } from "../messages/messages";

/*
	Generated class for the NewMessage page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-new-message',
	templateUrl: 'new-message.html'
})
export class NewMessagePage {
	friends: any[];
	searchTerm: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NewMessagePage');
	}

	ngOnInit() {
		this.getUsers();
	}

	getUsers = () => {
		this.userService.getUsers(this.searchTerm).then((users: any[]) => {
			this.friends = users;
		});
	}

	create = () => {
		this.navCtrl.push(MessagesPage);
	}
}
