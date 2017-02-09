import { Component, ViewChild } from "@angular/core";

import { NavController, NavParams, ActionSheetController, Content } from "ionic-angular";

import { UserService } from "../../assets/services/user.service";
import { ProfilePage } from "../profile/profile";

const messageService = require("../../assets/messages/messageService");
const TopicUpdate = require("../../assets/models/topicUpdate");
const Burst = require("../../assets/messages/burst");
import errorService from "../../assets/services/error.service";

@Component({
	selector: 'page-messages',
	templateUrl: 'messages.html'
})
export class MessagesPage {
	topicId: number;
	topic: any;
	topicObject: any;

	partners: any[] = [];
	messagesLoading: boolean = true;

	burstTopic: number = 0;
	bursts: any[] = [];

	@ViewChild(Content) content: Content;

	messages: any[];
	constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private userService: UserService) {
	}

	ngOnInit() {
		this.topicId = parseFloat(this.navParams.get("topicId"));

		messageService.getTopic(this.topicId).then((topic) => {
			this.topic = topic.data;
			this.topicObject = topic;
			this.partners = topic.data.partners;

			this.messagesLoading = false;
		})
	}

	ionViewDidEnter = () => {
		this.content.scrollToBottom(0);
	}

	private getNewElements(messagesAndUpdates, bursts) {
		return messagesAndUpdates.filter((message) => {
			return bursts.reduce((prev, current) => {
				return prev && !current.hasItem(message);
			}, true);
		});
	}

	private calculateBursts(messages) {
		var bursts = [new Burst(TopicUpdate)];
		var currentBurst = bursts[0];

		messages.sort((m1, m2) => {
			return m2.getTime() - m1.getTime();
		});

		messages.forEach((messageOrUpdate) => {
			if(!currentBurst.fitsItem(messageOrUpdate)) {
				currentBurst = new Burst(TopicUpdate);
				bursts.push(currentBurst);
			}

			currentBurst.addItem(messageOrUpdate);
		});

		return bursts;
	}

	private hasMatchingMessage(oldBurst, newBurst) {
		var matchingMessages = newBurst.getItems().filter((message) => {
			return oldBurst.hasItem(message);
		});

		return matchingMessages.length > 0;
	}

	private addBurst(bursts, burst) {
		bursts.push(burst);

		return true;
	}

	private mergeBurst(oldBurst, newBurst) {
		var newMessages = newBurst.getItems().filter((message) => {
			return !oldBurst.hasItem(message);
		});

		newMessages.forEach((message) => {
			oldBurst.addItem(message);
		});

		return true;
	}

	private addBurstOrMerge(bursts, burst) {
		var possibleMatches = bursts.filter((oldBurst) => {
			return this.hasMatchingMessage(oldBurst, burst);
		});

		if (possibleMatches.length === 0) {
			return this.addBurst(bursts, burst);
		}

		if (possibleMatches.length === 1) {
			return this.mergeBurst(possibleMatches[0], burst);
		}

		if (possibleMatches.length > 1) {
			errorService.criticalError(new Error("Burst merging possible matches > 1 wtf..."));
			return false;
		}
	}

	private mergeBursts(bursts, newBursts) {
		return newBursts.reduce((prev, burst) => {
			return prev && this.addBurstOrMerge(bursts, burst);
		}, true);
	}

	getBursts = () => {
		if (!this.topic || this.topic.messagesAndUpdates.length === 0) {
			return [];
		}

		var messagesAndUpdates = this.topic.messagesAndUpdates;

		if (this.burstTopic !== this.topic.id) {
			this.bursts = this.calculateBursts(messagesAndUpdates);
			this.burstTopic = this.topic.id;

			return this.bursts;
		}

		var newElements = this.getNewElements(messagesAndUpdates, this.bursts);
		if (newElements.length === 0) {
			return this.bursts;
		}

		this.bursts.forEach((burst) => {
			burst.removeAllExceptLast();
		});

		var newBursts = this.calculateBursts(messagesAndUpdates);
		if (!this.mergeBursts(this.bursts, newBursts)) {
			console.warn("Rerender all bursts!");
			this.bursts = newBursts;
		}

		return this.bursts;
	}

	messageBursts = () => {
		var bursts = this.getBursts();

		bursts.sort((b1, b2) => {
			return b1.firstItem().getTime() - b2.firstItem().getTime();
		});

		return bursts;
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

	goToProfile(profileId: number) {
		this.navCtrl.push(ProfilePage, {
			profileId
		});
	}
}
