import { Component, ViewChild } from "@angular/core";

import { NavController, Content, IonicPage } from "ionic-angular";

import { TranslateService } from '@ngx-translate/core';

const messageService = require("messages/messageService");
const contactsService = require("../../lib/services/friendsService");

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

	topics: any[] = [];
	requests: any[] = [];
	searchTerm: string = "";

	topicsLoading: boolean = true;
	moreTopicsAvailable: boolean = true;

	constructor(public navCtrl: NavController, private translate: TranslateService) {}

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

		console.warn("load more topics?", this.topics.length)
		if (this.topics.length >= 10) {
			return
		}

		messageService.loadMoreLatest(() => {}).then(() => {
			this.moreTopicsAvailable = !messageService.data.latestTopics.allTopicsLoaded
			this.topicsLoading = false;
		});
	}

	getLoadedTopics = () => {
		let loaded = true

		return this.topics.filter((topic) => {
			loaded = loaded && topic.loaded

			return loaded
		})
	}

	loadMoreTopics = (infiniteScroll) => {
		messageService.loadMoreLatest(() => {}).then(() => {
			this.moreTopicsAvailable = !messageService.data.latestTopics.allTopicsLoaded
			infiniteScroll.complete();
		})
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
		const count = this.requests.length > 1 ? "many" : "single"

		return this.translate.instant(`home.newContact.${count}`)
	}

	openContactRequests = () => {
		this.navCtrl.push("Requests");
	}

	openChat = (topicId: number) => {
		this.navCtrl.push("Messages", { topicId: topicId });
	}

	newMessage = () => {
		this.navCtrl.push("New Message", {}, {
			animation: "md-transition"
		});
	}
}
