import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

const messageService = require("../../lib/messages/messageService");

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

	bursts = []

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
		return { changed: false, bursts: this.bursts };
	}

	sendMessage = ({ images, text }) => {
		this.bursts = []
		this.messagesLoading = true

		messageService.sendNewTopic(this.partners.map((partner) => partner.user.getID()), text, images).then((topicId) => {
			this.navCtrl.push("Messages", { topicId: topicId }).then(() => {
				this.navCtrl.remove(this.navCtrl.length() - 2, 1)
			})
		});
	}
}
