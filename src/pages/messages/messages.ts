import { Component, ElementRef } from "@angular/core";

import { NavParams, IonicPage } from "ionic-angular";

const messageService = require("../../assets/messages/messageService");
const TopicUpdate = require("../../assets/models/topicUpdate");
const Burst = require("../../assets/messages/burst");
import errorService from "../../assets/services/error.service";
const inView = require("in-view");

@IonicPage({
	name: "Messages",
	segment: "messages/:topicId",
	defaultHistory: ["Home"]
})
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
	lastMessageElement: any;

	messages: any[];
	constructor(public navParams: NavParams, private element: ElementRef) {
	}

	ngOnInit() {
		this.topicId = parseFloat(this.navParams.get("topicId"));

		messageService.getTopic(this.topicId).then((topic) => {
			this.topic = topic.data;
			this.topicObject = topic;
			this.partners = topic.data.partners;

			topic.loadMoreMessages().then(() => {
				// this.content.scrollToBottom(0);

				this.messagesLoading = false;
				this.topicObject.markRead(errorService.criticalError)
			});
		})
	}

	ionViewDidEnter = () => {}

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

	private getBursts = () => {
		if (!this.topic || this.topic.messagesAndUpdates.length === 0) {
			return { changed: false, bursts: [] };
		}

		var messagesAndUpdates = this.topic.messagesAndUpdates;

		if (this.burstTopic !== this.topic.id) {
			this.bursts = this.calculateBursts(messagesAndUpdates);
			this.burstTopic = this.topic.id;

			return { changed: true, bursts: this.bursts };
		}

		var newElements = this.getNewElements(messagesAndUpdates, this.bursts);
		if (newElements.length === 0) {
			return { changed: false, bursts: this.bursts };
		}

		this.bursts.forEach((burst) => {
			burst.removeAllExceptLast();
		});

		var newBursts = this.calculateBursts(messagesAndUpdates);
		if (!this.mergeBursts(this.bursts, newBursts)) {
			console.warn("Rerender all bursts!");
			this.bursts = newBursts;
		}

		return { changed: true, bursts: this.bursts };
	}

	ngAfterViewChecked() {
		this.registerMarkReadListener()
	}

	onElementInView = ({ target }) => {
		if (inView.is(this.lastMessageElement)) {
			this.markRead()
			target.removeEventListener("scroll", this.onElementInView)
		}
	}

	registerMarkReadListener() {
		const selector = ".messages__burst:last-child .messages__wrap:last-child"
		const lastMessageElement: Element = this.element.nativeElement.querySelector(selector)

		if (!lastMessageElement || lastMessageElement === this.lastMessageElement) {
			return
		}

		this.lastMessageElement = lastMessageElement

		if (inView.is(lastMessageElement)) {
			this.markRead()
			return
		}

		document.querySelector("topicwithbursts .scroll-content").addEventListener("scroll", this.onElementInView)
	}

	messageBursts = () => {
		var burstInfo = this.getBursts();

		burstInfo.bursts.sort((b1, b2) => {
			return b1.firstItem().getTime() - b2.firstItem().getTime();
		});

		return burstInfo;
	}

	markRead = () => {
		setTimeout(() => {
			console.log('mark topic read', this.topicObject.getID())
			this.topicObject.markRead(errorService.criticalError)
		}, 0)
	}

	sendMessage = ({ images, text }) => {
		if (text.length === 0 && images.length === 0) {
			return;
		}

		console.log(images);

		messageService.sendMessage(this.topic.id, text, images).then(() => {
			this.topic.newMessage = "";
			this.markRead();
		});
	}
}
