import { Component, ViewChild } from "@angular/core";

import { NavController, Content, IonicPage } from "ionic-angular";

import { TranslateService } from '@ngx-translate/core';

import messageService from "../../lib/messages/messageService";
const contactsService = require("../../lib/services/friendsService");

import ChunkLoader from "../../lib/messages/chatChunk"
import MessageLoader from "../../lib/messages/message"
import ChatLoader from "../../lib/messages/chat"


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
		this.topics = [] //TODO messageService.data.latestTopics.data;

		console.warn("load more topics?", this.topics.length)
		if (this.topics.length >= 10) {
			return
		}

		messageService.loadMoreChats().then(() => {
			/*TODO this.moreTopicsAvailable = !messageService.data.latestTopics.allTopicsLoaded
			*/
			this.topicsLoading = false;
		});
	}

	getChats = () => {
		const chats = ChatLoader.getAll()
		const messages = MessageLoader.getAll()
		const chunks = ChunkLoader.getAll()

		const chatIDs = messageService.getChatIDs()

		let loaded = true

		return chatIDs.filter((chatID) => {
			loaded = loaded && chats.hasOwnProperty(chatID)

			return loaded
		}).map((chatID) => {
			const chat = chats[chatID]

			const latestMessage = messages[chat.getLatestMessage()]
			const latestChunk = chunks[chat.getLatestChunk()]

			return {
				id: chat.getID(),
				// title: "",
				unread: true,
				unreadCount: 5,
				time: latestMessage.getTime(),
				latestMessageText: latestMessage.getText(),

				partners: latestChunk.data.partners,
				partnersDisplay: latestChunk.data.partnersDisplay,
			}
		})
	}

	getLoadedTopics = () => {
		let loaded = true

		return this.topics.filter((topic) => {
			loaded = loaded && topic.loaded

			return loaded
		})
	}

	loadMoreTopics = (infiniteScroll) => {
		if (this.topicsLoading) {
			infiniteScroll.complete();
			return
		}

		messageService.loadMoreChats().then(() => {
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
