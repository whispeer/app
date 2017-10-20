import { Component } from '@angular/core';
import { Platform, NavController, NavParams, IonicPage } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core';

import messageService from "../../lib/messages/messageService"
import ChatLoader, { Chat } from "../../lib/messages/chat"
import ChunkLoader, { Chunk } from "../../lib/messages/chatChunk"
import { ContactsWithSearch } from '../../lib/contacts/contactsWithSearch'
import h from "../../lib/helper/helper";

import userService from "../../lib/users/userService"
const friendsService = require("../../lib/services/friendsService");

import * as Bluebird from 'bluebird';

@IonicPage({
	name: "New Message",
	segment: "newMessage/:receiverIds"
})
@Component({
	selector: 'page-new-message',
	templateUrl: 'new-message.html'
})
export class NewMessagePage extends ContactsWithSearch {
	friends: any[];
	searchTerm: string = "";
	selectedUserMap: any = {};
	selectedUsers: any[] = [];
	ios: boolean = false;

	constructor(public navCtrl: NavController, public translate: TranslateService, private platform: Platform, public navParams: NavParams) { // tslint:disable-line:no-unused-variable
		// super(translate)
		super(translate)

		this.ios = platform.is("ios")
	}


	addSelectedUser = (user) => {
		if (this.selectedUsers.indexOf(user) === -1) {
			this.selectedUsers.push(user);
		}

		this.selectedUserMap[user.id] = true
	}

	removeSelectedUser = (user) => {
		h.removeArray(this.selectedUsers, user);

		delete this.selectedUserMap[user.id]
	}

	updateSelectedUsers = (user) => {
		if (this.selectedUserMap[user.id]) {
			this.removeSelectedUser(user);
		} else {
			this.addSelectedUser(user);
		}
	}

	create = () => {
		this.send(this.selectedUsers);
	}

	close = () => {
		this.navCtrl.pop();
	}

	receiverString: string;
	loading: boolean = true;

	ngOnInit() {
		this.receiverString = this.navParams.get("receiverIds");

		if (this.hasReceiverParam()) {
			userService.getMultipleFormatted(this.getReceiverParam()).then((users) => {
				this.send(users);
			})
			return
		}

		friendsService.awaitLoading().then(() => {
			friendsService.listen(this.loadContactsUsers);
			this.loadContactsUsers().then(() => {
				this.contactsLoading = false
			});
		});

		this.loading = false
	}

	private sendToUserTopic(users) {
		if (users.length > 1) {
			return Bluebird.resolve();
		}

		return messageService.getUserChat(users[0].id);

	}

	send = (users) => {
		this.loading = true
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
				receiverObjects: users.sort((u1, u2) => u1.id - u2.id)
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
