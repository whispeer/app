import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

const messageService = require("../../assets/messages/messageService");

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

	sendMessage = ({ images, text }) => {
		messageService.sendNewTopic(this.partners.map((partner) => partner.user.getID()), text, images).then((topicId) => {
			this.navCtrl.setRoot("Messages", { topicId: topicId });
		});
	}
}
