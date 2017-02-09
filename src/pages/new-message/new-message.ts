import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from "../../assets/services/user.service";

import { MessagesPage } from "../messages/messages";

const messageService = require("../../assets/messages/messageService");

import * as Bluebird from 'bluebird';

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

	constructor(public navCtrl: NavController) {}

	chooseReceivers = (users) => {
		this.partners = users;
		this.receiversChosen = true;
	}

	messageBursts = () => {
		return [];
	}

	sendMessage = () => {
		messageService.sendNewTopic(this.partners.map((partner) => partner.user), this.topic.newMessage, []).then((topicId) => {
			this.navCtrl.push(MessagesPage, { topicId: topicId });
		});
	}
}
