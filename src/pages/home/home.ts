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

	chatsLoading: boolean = true;
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
			this.moreTopicsAvailable = !messageService.allChatsLoaded
			this.chatsLoading = false;
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
			// const latestTopicUpdate = topicUpdates[chat.getLatestTopicUpdate()]

			return {
				id: chat.getID(),

				unread: chat.isUnread(),
				unreadCount: chat.getUnreadMessageIDs().length,

				// title: latestTopicUpdate.getText(),

				time: latestMessage.getTime(),
				latestMessageText: latestMessage.getText(),

				partners: latestChunk.getPartners(),
				partnersDisplay: latestChunk.getPartnerDisplay()
			}
		})
	}

	loadMoreTopics = (infiniteScroll) => {
		if (this.chatsLoading) {
			infiniteScroll.complete();
			return
		}

		messageService.loadMoreChats().then(() => {
			this.moreTopicsAvailable = !messageService.allChatsLoaded
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

	openChat = (chatID: number) => {
		this.navCtrl.push("Messages", { chatID: chatID });
	}

	newMessage = () => {
		this.navCtrl.push("New Message", {}, {
			animation: "md-transition"
		});
	}
}
