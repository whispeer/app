import { Component, ViewChild } from "@angular/core";

import { NavController, Content, IonicPage } from "ionic-angular";

import { TranslateService } from '@ngx-translate/core';

import messageService from "../../lib/messages/messageService";
import Memoizer from "../../lib/asset/memoizer"

const contactsService = require("../../lib/services/friendsService");

import ChunkLoader from "../../lib/messages/chatChunk"
import MessageLoader from "../../lib/messages/message"
import ChatLoader from "../../lib/messages/chat"

const getMessageInfo = (latestMessageID) => {
	if (!MessageLoader.isLoaded(latestMessageID)) {
		return {
			latestMessageText: ""
		}
	}

	const latestMessage = MessageLoader.getLoaded(latestMessageID)

	return {
		time: latestMessage.getTime(),
		latestMessageText: latestMessage.getText(),
	}
}

const memoizer = new Memoizer([
	() => messageService.getChatIDs(),
	() => ChatLoader.getAll(),
	() => MessageLoader.getAll(),
], (chatIDs) => {
	let loaded = true

	return chatIDs.filter((chatID) => {
		loaded = loaded && ChatLoader.isLoaded(chatID)

		return loaded
	}).map((chatID) => {
		const chat = ChatLoader.getLoaded(chatID)

		const latestChunk = ChunkLoader.getLoaded(chat.getLatestChunk())

		const chatInfo = {
			id: chat.getID(),

			unread: chat.isUnread(),
			unreadCount: chat.getUnreadMessageIDs().length,
		}

		const chunkInfo = {
			partners: latestChunk.getPartners(),
			partnersDisplay: latestChunk.getPartnerDisplay(),
			title: latestChunk.getTitle(),
			time: latestChunk.getTime(),
			type: latestChunk.getReceiver().length > 2 ? "groupChat" : "peerChat"
		}

		const messageInfo = getMessageInfo(chat.getLatestMessage())

		return Object.assign({}, chatInfo, chunkInfo, messageInfo)
	}).sort((a, b) =>
		b.time - a.time
	)
})

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

	lang: string = "en"

	constructor(public navCtrl: NavController, private translate: TranslateService) {}

	ngOnInit() {}

	ionViewDidEnter = () => {
		// this should hide the search bar
		// but it runs too early when redirected from login. (works in messages...)
		// another problem is that the search bars have different heights.

		//this.content.scrollTo(0, 58, 0);
		this.loadTopics();
		this.loadRequests();

		const en = (this.translate.currentLang.toLowerCase().indexOf("de") === -1);
		this.lang = en ? "en" : "de";
	}

	loadTopics = () => {
		this.topics = []

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
		return memoizer.getValue()
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
