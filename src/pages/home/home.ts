import { Component } from "@angular/core";

import { ModalController, NavController, FabContainer } from "ionic-angular";

import { NewMessageModal } from "./newMessage.modal";

import { UserService } from "../../assets/services/user.service";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	topics: any[];
	searchTerm: string = "";

	constructor(public navCtrl: NavController, private userService: UserService, private modalCtrl: ModalController) {}

	ngOnInit() { this.getUsers(); }

	getUsers = () => {
		this.topics = [];
		this.userService.getUsers(this.searchTerm).then((users: any[]) => {
			users.forEach((user: any, index: number) => {
				user.online = user.name.last.length > 5;

				let item = {
					topic: {
						title: "",
						lastMessage: "Lorem Ipsum dolor sit amet.",
						newMessage: index === 0 || index === 1,
						date: new Date(user.dob.split(" ")[0])
					},
					user: user
				};

				this.topics.push(item);
			});

			// sorting: UNREAD (sorted by day) - READ (sorted by day)
			this.topics = this.topics.sort((a: any, b: any): any => {
				return b.topic.newMessage - a.topic.newMessage || b.topic.date - a.topic.date;
			});

			// this is not good code. but i need this attribute.
			// hacky demo data. you're gonna do the real implementation better ;-)
			this.topics.forEach((elem: any, index: number, arr: any[]) => {
				// set property if this is the last topic with a new message.
				if(elem.topic.newMessage && arr[index + 1] && !arr[index + 1].topic.newMessage) {
					elem.lastNew = true;
				}
			});
		});
	}

	showOptions = (fab?: FabContainer) => {
		if(fab) {
			fab.toggleList();
		}
	}

	handleClick = (fab?: FabContainer) => {
		if(fab) {
			fab.close();
		}

		let modal = this.modalCtrl.create(NewMessageModal);
		modal.present();
	}

}
