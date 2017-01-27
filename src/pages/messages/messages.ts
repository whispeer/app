import { Component } from "@angular/core";

import { NavController} from "ionic-angular";

@Component({
	selector: 'page-messages',
	templateUrl: 'messages.html'
})
export class MessagesPage {
	messages: any[];
	constructor(public navCtrl: NavController) {}

	ngOnInit() {
		this.messages = [];
		for(let i = 0; i < 10000; i++) {
			const b = i % 2;
			this.messages.push({
				id: i,
				user: {
					isMe: b,
					name: b ? "Daniel" : "Steffen"
				},
				text: "Hi! I am the default message.",
				date: new Date()
			});
		}
	}

}
