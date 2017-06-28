import { Component, ElementRef } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";

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
	chat: Chat
	loading: boolean = true
	title: string = ""

	constructor(private navCtrl: NavController, private navParams: NavParams, private element: ElementRef) {}

	ngOnInit() {
		const chatID = parseInt(this.navParams.get("chatID"), 10);

		initService.awaitLoading().then(() => {
			return ChatLoader.get(chatID)
		}).then((chat) => {
			this.chat = chat
			this.loading = false
			this.title = this.chat.getTitle()
		})
		console.log('Init details page for topic', chatID);
	}

	goToUser(userID) {
		this.navCtrl.push("Profile", {
			userId: userID
		})
	}

	close() {
		this.navCtrl.push("Messages", {
			chatID: this.chat.getID()
		})
	}

	setTitle = (title) => {
		this.chat.setTitle(title)
	}

	isAdmin = (user) => this.chat.isAdmin(user)

	amIAdmin = () => this.chat.amIAdmin()

	getReceivers = () => {
		if (!this.chat) {
			return []
		}

		return this.chat.getReceivers()
	}
}
