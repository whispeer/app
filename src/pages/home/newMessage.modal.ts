import { Component } from "@angular/core";
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { UserService } from "../../assets/services/user.service";

@Component({
	templateUrl: "newMessage.modal.html"
})
export class NewMessageModal {
	friends: any[];
	searchTerm: string = "";

	constructor(
		public platform: Platform,
		public params: NavParams,
		public viewCtrl: ViewController,
		private userService: UserService
	) {}

	ngOnInit() {
		this.getUsers();
	}

	getUsers = () => {
		this.userService.getUsers(this.searchTerm).then((users: any[]) => {
			this.friends = users;
		});
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}