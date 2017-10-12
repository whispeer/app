import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular'

import messageService from "../../lib/messages/messageService"
import ChatLoader, { Chat } from "../../lib/messages/chat"
import ChunkLoader, { Chunk } from "../../lib/messages/chatChunk"

const userService = require("../../lib/users/userService").default;

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
	}

	private sendToUserTopic(users) {
		if (users.length > 1) {
			return Bluebird.resolve();
		}

		return messageService.getUserChat(users[0].id);

	}

	send = (users) => {
		this.sendToUserTopic(users).then((chatID) => {
			if (chatID) {
				this.goToChat(chatID)
				return
			}

			return Chunk.createRawData(users.map(({ id }) => id), { content: {} })
		}).then((chunkData) => {
			const chunk = new Chunk({
				content: {},
				server: {
					id: -1,
					chatID: -1,
					createTime: Date.now()
				},
				meta: chunkData.chunk.meta,
				receiverObjects: users
			}, chunkData)
			const chat = new Chat({ id: -1, latestMessage: null, latestChunk: chunk, unreadMessageIDs: [] }, true)

			ChatLoader.addLoaded(-1, chat)
			ChunkLoader.addLoaded(-1, chunk)

			this.goToChat(-1)
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

	goToChat = (chatID) => {
		this.navCtrl.push("Messages", { chatID }).then(() => {
			this.navCtrl.remove(this.navCtrl.length() - 2, 1)
		})
	}
}
