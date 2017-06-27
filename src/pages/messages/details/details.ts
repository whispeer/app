import { Component, ElementRef } from "@angular/core";
import { NavParams, IonicPage } from "ionic-angular";

import ChatLoader, { Chat } from "../../../lib/messages/chat"

const initService = require("../../../lib/services/initService")

@IonicPage({
	name: "Chat Details",
	segment: "messages/:chatID/details",
})
@Component({
	selector: 'page-details',
	templateUrl: 'details.html'
})
export class DetailPage {
	chat: Chat;

	constructor(public navParams: NavParams, private element: ElementRef) {}

	ngOnInit() {
		const chatID = parseInt(this.navParams.get("chatID"), 10);

		initService.awaitLoading().then(() => {
			return ChatLoader.get(chatID)
		}).then((chat) => {
			this.chat = chat
		})
		console.log('Init details page for topic', chatID);
	}

	getPartners = () => {
		if (!this.chat) {
			return []
		}

		return this.chat.getPartners()
	}
}
