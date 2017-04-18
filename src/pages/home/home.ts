import { Component, ViewChild } from "@angular/core";

import { NavController, Content, IonicPage } from "ionic-angular";

import { ContactRequestsPage } from "../contact-requests/contact-requests";

import { MessagesPage } from "../messages/messages";
import { NewMessagePage } from "../new-message/new-message";

const messageService = require("messages/messageService");
const contactsService = require("../../assets/services/friendsService");

@IonicPage({
	name: "Home",
	segment: "home"
})
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Content) content: Content;

	topics: any[];
	requests: any[] = [];
	searchTerm: string = "";

	topicsLoading: boolean = true;

	constructor(public navCtrl: NavController) {}

	ngOnInit() {}

	ionViewDidEnter = () => {
		// this should hide the search bar
		// but it runs too early when redirected from login. (works in messages...)
		// another problem is that the search bars have different heights.

		//this.content.scrollTo(0, 58, 0);
		this.loadTopics();
		this.loadRequests();
	}

	loadTopics = () => {
		this.topics = messageService.data.latestTopics.data;

		messageService.loadMoreLatest(() => {}).then(() => {
			this.topicsLoading = false;
		});
	}

	loadMoreTopics = (infiniteScroll) => {
		messageService.loadMoreLatest(() => {}).then(() => {
			infiniteScroll.complete();
		})
	}

	nextUnread = (topic) => {
		if (!topic.unread) {
			return false;
		}

		const index = this.topics.indexOf(topic);
		const nextTopic = this.topics[index + 1];

		if (!nextTopic) {
			return false;
		}

		return !nextTopic.unread;
	}

	updateRequests = () => {
		this.requests = contactsService.getRequests()
	}

	loadRequests = () => {
		contactsService.awaitLoading().then(() => {
			this.updateRequests()
			contactsService.listen(this.updateRequests);
		});
	}

	get requestsLabel() {
		return this.requests.length > 1 ? 'New contact requests' : 'New contact request'
	}

	openContactRequests = () => {
		this.navCtrl.push(ContactRequestsPage);
	}

	openChat = (topicId: number) => {
		this.navCtrl.push(MessagesPage, { topicId: topicId });
	}

	newMessage = () => {
		this.navCtrl.push(NewMessagePage, {}, {
			animation: "md-transition"
		});
	}
}
