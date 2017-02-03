import { Component, ViewChild } from "@angular/core";

import { NavController, Content } from "ionic-angular";

@Component({
	selector: 'page-messages',
	templateUrl: 'messages.html'
})
export class MessagesPage {
	@ViewChild(Content) content: Content;

	i: number = 20;
	messages: any[];
	constructor(public navCtrl: NavController) {}

	ngOnInit() {
		this.messages = [];
		for(let i = 0; i < 10; i++) {
			const b = i % 2;
			this.messages.push({
				id: i,
				isMe: () => {
					return b;
				},
				isOther: () => {
					return !b;
				},
				sender: () => {

				},
				messages: [{
					text: "Hi! I am the default message."
				}, {
					text: "I am the latest one."
				}],
				date: new Date()
			});
		}
	}

	ionViewDidEnter = () => {
		this.content.scrollToBottom(0);
	}

	messageBursts = () => {
		return this.messages;
	}
}
