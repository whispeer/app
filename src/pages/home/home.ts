import { Component, ViewChild } from "@angular/core";

import { NavController, FabContainer, Content } from "ionic-angular";

import { MessagesPage } from "../messages/messages";
import { FriendsPage } from "../friends/friends";
import { ProfilePage } from "../profile/profile";
import { SettingsPage } from "../settings/settings";
import { NewMessagePage } from "../new-message/new-message";

import { UserService } from "../../assets/services/user.service";

const messageService = require("messages/messageService");

import sessionService from '../../assets/services/session.service';

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

	ngOnInit() {}

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

	handleClick = ($event: any, fab: FabContainer) => {
		if($event.type === "press") {
			fab.toggleList();
		} else {
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
					userId: sessionService.userid
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

	openChat = (topicId: number) => {
		this.navCtrl.push(MessagesPage, { topicId: topicId });
	}

}
