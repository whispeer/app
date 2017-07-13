import { Component, ElementRef } from "@angular/core";
import { NavController, NavParams, IonicPage, AlertController } from "ionic-angular";

import ChatLoader, { Chat } from "../../../lib/messages/chat"

import { TranslateService } from '@ngx-translate/core';

import ReportService from "../../../lib/services/reportService";

const initService = require("../../../lib/services/initService")

@IonicPage({
	name: "Chat Details",
	segment: "messages/:chatID/details",
})
@Component({
	selector: 'page-details',
	templateUrl: 'details.html'
})
export class DetailPage {
	chat: Chat
	loading: boolean = true
	title: string = ""

	receiverToAdd: string

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private element: ElementRef,
		private alertCtrl: AlertController,
		private translate: TranslateService
	) {}

	ngOnInit() {
		const chatID = parseInt(this.navParams.get("chatID"), 10);

		initService.awaitLoading().then(() => {
			return ChatLoader.get(chatID)
		}).then((chat) => {
			this.chat = chat
			this.loading = false
			this.title = this.chat.getTitle()
		})
		console.log('Init details page for topic', chatID);
	}

	goToUser(userID) {
		this.navCtrl.push("Profile", {
			userId: userID
		})
	}

	close() {
		this.navCtrl.push("Messages", {
			chatID: this.chat.getID()
		})
	}

	promote = (user) => {
		return this.chat.addAdmin(user)
	}

	remove = (user) => {
		return this.chat.removeReceiver(user)
	}

	addContact = () => {
		this.navCtrl.push("Select User", { chatID: this.chat.getID() })
	}

	setTitle = (title) => {
		this.chat.setTitle(title)
	}

	isAdmin = (user) => this.chat.isAdmin(user)

	amIAdmin = () => this.chat.amIAdmin()

	getReceivers = () => {
		if (!this.chat) {
			return []
		}

		return this.chat.getReceivers()
	}

	report = () => {
		let reportConfirm = this.alertCtrl.create({
			title: this.translate.instant("topic.detail.reportConfirm.title"),
			message: this.translate.instant("topic.detail.reportConfirm.message"),
			buttons: [{
				text: "Cancel"
			}, {
				text: "Report",
				handler: () => {
					ReportService.sendReport("chat", this.chat.getID());
				}
			}]
		});

		reportConfirm.setCssClass('logout-confirm');
		reportConfirm.present();
	}
}
