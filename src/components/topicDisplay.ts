import { Component, Input, Output, EventEmitter } from "@angular/core";

import { NavController, NavParams, ActionSheetController, Content } from "ionic-angular";

import { UserService } from "../assets/services/user.service";
import { ProfilePage } from "../pages/profile/profile";

const messageService = require("../assets/messages/messageService");
const TopicUpdate = require("../assets/models/topicUpdate");
const Burst = require("../assets/messages/burst");
import errorService from "../assets/services/error.service";

@Component({
	selector: 'topicWithBursts',
	templateUrl: 'topic.html'
})
export class TopicComponent {
	@Input() partners;
	@Input() topic;
	@Input() messageBurstsFunction;
	@Input() messagesLoading;

	@Output() sendMessage = new EventEmitter();

	constructor(public navCtrl: NavController, private actionSheetCtrl: ActionSheetController,) {}

	sendMessageToTopic = () => {
		this.sendMessage.emit();
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

	goToProfile(userId: number) {
		this.navCtrl.push(ProfilePage, {
			userId
		});
	}
}
