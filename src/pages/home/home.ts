import { Component, ViewChild } from "@angular/core";

import { NavController, FabContainer, Content } from "ionic-angular";

import { MessagesPage } from "../messages/messages";
import { FriendsPage } from "../friends/friends";
import { ProfilePage } from "../profile/profile";
import { SettingsPage } from "../settings/settings";
import { NewMessagePage } from "../new-message/new-message";

import { UserService } from "../../assets/services/user.service";

const messageService = require("messages/messageService");

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Content) content: Content;

	topics: any[];
	searchTerm: string = "";

	topicsLoading: boolean = true;

	constructor(public navCtrl: NavController, private userService: UserService) {}

	ngOnInit() {

	}

	ionViewDidEnter = () => {
		// this should hide the search bar
		// but it runs too early when redirected from login. (works in messages...)
		// another problem is that the search bars have different heights.

		//this.content.scrollTo(0, 58, 0);
		this.getTopics();
	}

	getTopics = () => {
		this.topics = messageService.data.latestTopics.data;

		messageService.loadMoreLatest(() => {}).then(() => {
			this.topicsLoading = false;
		});
	}

	getUsers = () => {
		this.topics = [];
		this.userService.getUsers(this.searchTerm).then((users: any[]) => {
			users.forEach((user: any, index: number) => {
				user.online = user.name.length > 10;

				let item = {
					id: index,
					topic: {
						title: "",
						lastMessage: "Lorem Ipsum dolor sit amet.",
						newMessage: index === 0 || index === 1,
						date: new Date(user.dob.split(" ")[0])
					},
					partners: user.online ? [user, user, user] : [user]
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

			this.topicsLoading = false;
		});
	}

	handleClick = ($event: any, fab: FabContainer) => {
		if($event.type === "press") {
			console.log("press");
			fab.toggleList();
		} else {
			console.log("click");
			if(fab._listsActive) {
				fab.close();
			} else {
				this.navCtrl.push(NewMessagePage, {}, {
					animation: "md-transition"
				});
			}
		}
	}

	fabSideClick = ($event: any, fab: FabContainer, what: string) => {
		switch (what) {
			case "friends":
				this.navCtrl.push(FriendsPage);
				break;
			case "profile":
				this.navCtrl.push(ProfilePage, {
					userId: 0
				});
				break;
			case "settings":
				this.navCtrl.push(SettingsPage);
				break;
			default:
				// code...
				break;
		}
		fab.close();
	}

	openChat = () => {
		this.navCtrl.push(MessagesPage);
	}

}
