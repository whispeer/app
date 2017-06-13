import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular'

import messageService from "../../lib/messages/messageService"
const userService = require("../../lib/user/userService");

import * as Bluebird from 'bluebird';

@IonicPage({
	name: "New Message",
	segment: "newMessage/:receiverIds"
})
@Component({
	selector: 'page-new-message',
	templateUrl: 'new-message.html'
})
export class NewMessagePage {
	messagesLoading = false;
	partners: any = [];
	receiversChosen: boolean = false;
	loading: boolean = true;

	bursts = []

	topic = {
		newMessage: ""
	};

	receiverString: string;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ngOnInit() {
		this.receiverString = this.navParams.get("receiverIds");

		if (this.hasReceiverParam()) {
			userService.getMultipleFormatted(this.getReceiverParam()).then((users) => {
				this.send(users);
			})
			return
		}

		this.loading = false;
	}

	private sendToUserTopic(users) {
		if (users.length > 1) {
			return Bluebird.resolve();
		}

		return messageService.getUserTopic(users[0].id);

	}

	send = (users) => {
		this.sendToUserTopic(users).then((topicId) => {
			if (topicId) {
				this.goToTopic(topicId)
				return
			}

			this.partners = users;
			this.receiversChosen = true;
			this.loading = false;
		});
	}

	hasReceiverParam() {
		const type = typeof this.receiverString;

		if (this.receiverString === ":receiverIds") {
			return false
		}

		return ["number", "string"].indexOf(type) > -1;
	}

	getReceiverParam() {
		if (typeof this.receiverString === "number") {
			return [this.receiverString];
		}

		if (typeof this.receiverString === "string") {
			return this.receiverString.split(",").map((r) => { return parseInt(r, 10) });
		}

		throw new Error("invalid receiver param");
	}

	messageBursts = () => {
		return { changed: false, bursts: this.bursts };
	}

	goToTopic = (topicId) => {
		this.navCtrl.push("Messages", { topicId: topicId }).then(() => {
			this.navCtrl.remove(this.navCtrl.length() - 2, 1)
		})
	}

	sendMessage = ({ images, text }) => {
		this.bursts = []
		this.messagesLoading = true

		messageService.sendNewTopic(this.partners.map((partner) => partner.user.getID()), text, images).then((topicId) => {
			this.goToTopic(topicId)
		});
	}
}
