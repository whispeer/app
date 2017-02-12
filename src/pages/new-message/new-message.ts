import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MessagesPage } from "../messages/messages";

const messageService = require("../../assets/messages/messageService");

const userService = require("../../assets/user/userService");

@Component({
	selector: 'page-new-message',
	templateUrl: 'new-message.html'
})
export class NewMessagePage {
	messagesLoading = false;
	partners: any = [];
	receiversChosen: boolean = false;

	topic = {
		newMessage: ""
	};

	receiverString: string;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ngOnInit() {
		this.receiverString = this.navParams.get("receiverIds");
	}

	chooseReceivers = (users) => {
		this.partners = users;
		this.receiversChosen = true;
	}

	messageBursts = () => {
		return { changed: false, bursts: [] };
	}

	sendMessage = () => {
		messageService.sendNewTopic(this.partners.map((partner) => partner.user), this.topic.newMessage, []).then((topicId) => {
			this.navCtrl.push(MessagesPage, { topicId: topicId });
		});
	}
}
