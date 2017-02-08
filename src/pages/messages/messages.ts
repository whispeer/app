import { Component, ViewChild } from "@angular/core";

import { NavController, NavParams, ActionSheetController, Content } from "ionic-angular";

import { UserService } from "../../assets/services/user.service";
import { ProfilePage } from "../profile/profile";

const messageService = require("../../assets/messages/messageService");

@Component({
	selector: 'page-messages',
	templateUrl: 'messages.html'
})
export class MessagesPage {
	topicId: number;
	user: any = { basic: {} };
	messagesLoading: boolean = true;

	@ViewChild(Content) content: Content;

	i: number = 20;
	messages: any[];
	constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private userService: UserService) {
	}

	ngOnInit() {
		this.topicId = parseFloat(this.navParams.get("topicId"));

		messageService.getTopic(this.topicId).then((topic) => {
			this.user = topic.data.partners[0];
		})

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
				messages: i % 3 ? [{
					text: "😂🤓",
					emojiOnly: true
				}, {
					text: "I am the latest one."
				}] : [{
					text: "Hi! I am the default message."
				}, {
					text: "I am the latest one."
				}],
				date: new Date()
			});
		}

		this.messagesLoading = false;
	}

	ionViewDidEnter = () => {
		this.content.scrollToBottom(0);
	}

	messageBursts = () => {
		return this.messages;
	}

	presentActionSheet = () => {
		let actionSheet = this.actionSheetCtrl.create({
			title: "What do you want to send?", // todo: translate!
			buttons: [{
				text: "Select from Gallery",
				handler: () => {
					console.log("Select smth from Gallery!");
				}
			}, {
				text: "Take Photo",
				handler: () => {
					console.log("Take new photo!");
				}
			}, {
				text: "Cancel",
				role: "cancel",
				handler: () => {
					console.log("Cancel clicked.");
				}
			}]
		});

		actionSheet.present();
	}

	goToProfile() {
		this.navCtrl.push(ProfilePage);
	}
}
