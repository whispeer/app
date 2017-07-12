import { Component, ElementRef, ViewChild } from "@angular/core";
import { Platform, NavController, NavParams, IonicPage, Searchbar } from "ionic-angular";

const contactsService = require("../../../lib/services/friendsService");
const initService = require("../../../lib/services/initService")

import ChatLoader, { Chat } from "../../../lib/messages/chat"

import { ContactsWithSearch } from "../../../lib/contacts/contactsWithSearch"
import { TranslateService } from "@ngx-translate/core";

import h from "../../../lib/helper/helper";

import Memoizer from "../../../lib/asset/memoizer"

import * as Bluebird from "bluebird";

@IonicPage({
	name: "Select User",
	segment: "messages/:chatID/add",
})
@Component({
	selector: 'page-add',
	templateUrl: 'add.html'
})
export class AddPage extends ContactsWithSearch {
	@ViewChild(Searchbar) searchBar: Searchbar

	chat: Chat
	title: string = ""

	searchTerm: string = ""
	selectedUserMap: any = {}
	selectedUsers: any[] = []
	ios: boolean = false
	loadingChat: boolean = true
	saving: boolean = false

	addMemoizer: Memoizer

	constructor(private navCtrl: NavController, private navParams: NavParams, private platform: Platform, private element: ElementRef, private translate: TranslateService) {
		super()

		this.ios = platform.is("ios")

		this.addMemoizer = new Memoizer([
			() => this.getUsers(),
			() => this.chat,
		], (users, chat) => {
			if (!chat) {
				return users
			}

			return users.filter((u) => chat.getReceiverIDs().indexOf(u.id) === -1)
		})
	}

	ngOnInit() {
		contactsService.awaitLoading().then(() => {
			contactsService.listen(this.loadContactsUsers);

			this.loadContactsUsers().then(() => {
				this.contactsLoading = false
			});
		});

		const chatID = parseInt(this.navParams.get("chatID"), 10);

		initService.awaitLoading().then(() => {
			return ChatLoader.get(chatID)
		}).then((chat) => {
			this.chat = chat
			this.loadingChat = false
			this.title = this.chat.getTitle()
		})
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

	getFilteredUsers = () => {
		return this.addMemoizer.getValue()
	}

	addReceivers = () => {
		this.saving = true

		Bluebird.resolve(this.selectedUsers).map((user: any): any => {
			return user.id
		}).then((data) => {
			return this.chat.addReceivers(data)
		}).then((data) => {
			this.navCtrl.push("Chat Details", { chatID: this.chat.getID() })
		});
	}

}
