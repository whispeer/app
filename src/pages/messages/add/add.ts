import { Component, ElementRef, ViewChild } from "@angular/core";
import { Platform, NavController, NavParams, IonicPage, Searchbar } from "ionic-angular";

const contactsService = require("../../../lib/services/friendsService");
const initService = require("../../../lib/services/initService")

import ChatLoader, { Chat } from "../../../lib/messages/chat"

import { ContactsWithSearch } from "../../../lib/contacts/contactsWithSearch"
import { TranslateService } from "@ngx-translate/core";

import h from "../../../lib/helper/helper";

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

	searchTerm: string = "";
	selectedUserMap: any = {};
	selectedUsers: any[] = [];
	ios: boolean = false;
	loading: boolean = true

	constructor(private navCtrl: NavController, private navParams: NavParams, private platform: Platform, private element: ElementRef, private translate: TranslateService) {
		super()

		this.ios = platform.is("ios")
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
			this.loading = false
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

	addReceivers = () => {
		Bluebird.resolve(this.selectedUsers).map((user: any): any => {
			return user.id
		}).then((data) => {
			return this.chat.addReceivers(data)
		}).then((data) => {
			// todo link to details page
		});
	}

}
