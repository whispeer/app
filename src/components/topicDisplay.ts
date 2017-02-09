import { Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";

import { NavController, NavParams, ActionSheetController, Content, Footer } from "ionic-angular";

import { UserService } from "../assets/services/user.service";
import { ProfilePage } from "../pages/profile/profile";

const messageService = require("../assets/messages/messageService");
const TopicUpdate = require("../assets/models/topicUpdate");
const Burst = require("../assets/messages/burst");
import errorService from "../assets/services/error.service";

import * as Bluebird from "bluebird";

@Component({
	selector: "topicWithBursts",
	templateUrl: "topic.html"
})
export class TopicComponent {
	@Input() partners;
	@Input() topic;
	@Input() messageBurstsFunction;
	@Input() messagesLoading;

	@Output() sendMessage = new EventEmitter();

	@ViewChild(Content) content: Content;
	@ViewChild(Footer) footer: Footer;

	constructor(public navCtrl: NavController, private actionSheetCtrl: ActionSheetController,) {}

	contentHeight = 0;
	footerHeight = 0;

	sendMessageToTopic = () => {
		this.sendMessage.emit();
	}

	presentActionSheet = () => {
		let actionSheet = this.actionSheetCtrl.create({
			title: "What do you want to send?",
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

	awaitRendering = () => {
		return Bluebird.delay(100);
	}

	messageBursts = () => {
		const { changed, bursts } = this.messageBurstsFunction();

		if (changed) {
			const dimension = this.content.getContentDimensions();
			const scrollFromBottom = dimension.scrollHeight - dimension.scrollTop;

			this.awaitRendering().then(() => {
				const newDimension = this.content.getContentDimensions();

				this.content.scrollTo(dimension.scrollLeft, newDimension.scrollHeight - scrollFromBottom, 0);
			})
		}

		return bursts;
	}

	change() {
		const fontSize = 16;
		const maxSize = fontSize*7;

		const contentElement = this.content.getScrollElement();
		const footerElement = this.footer.getNativeElement();

		if (!this.footerHeight) {
			this.footerHeight = footerElement.offsetHeight;
		}

		const element   = document.getElementById("sendMessageBox");
		const textarea  = element.getElementsByTagName("textarea")[0];

		textarea.style.minHeight  = "0";
		textarea.style.height     = "0";
		contentElement.style.height = "";

		const contentHeight = contentElement.offsetHeight;


		const scroll_height = Math.min(textarea.scrollHeight, maxSize);

		// apply new style
		element.style.height      = scroll_height + "px";
		textarea.style.minHeight  = scroll_height + "px";
		textarea.style.height     = scroll_height + "px";

		contentElement.style.height = contentHeight - (footerElement.offsetHeight - this.footerHeight) + "px";
	}

	goToProfile(userId: number) {
		this.navCtrl.push(ProfilePage, {
			userId
		});
	}
}
