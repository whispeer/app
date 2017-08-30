import { Component, ElementRef } from "@angular/core"; // tslint:disable-line:no-unused-variable
import { NavController, NavParams, IonicPage } from "ionic-angular"; // tslint:disable-line:no-unused-variable

import errorService from "../../lib/services/error.service";

import messageService from "../../lib/messages/messageService";
import Burst from "../../lib/messages/burst"
import { Chat } from "../../lib/messages/chat"
import MessageLoader, { Message } from "../../lib/messages/message"

const inView = require("in-view");

const initService = require("../../lib/services/initService");

namespace BurstHelper {
	export const getNewElements = (messagesAndUpdates, bursts) => {
		return messagesAndUpdates.filter((message) => {
			return bursts.reduce((prev, current) => {
				return prev && !current.hasItem(message);
			}, true);
		});
	}

	export const calculateBursts = (messages: any[]) => {
		var bursts = [new Burst()];
		var currentBurst = bursts[0];

		messages.sort((m1, m2) => {
			return m2.getTime() - m1.getTime();
		});

		messages.forEach((messageOrUpdate) => {
			if(!currentBurst.fitsItem(messageOrUpdate)) {
				currentBurst = new Burst();
				bursts.push(currentBurst);
			}

			currentBurst.addItem(messageOrUpdate);
		});

		return bursts;
	}

	const hasMatchingMessage = (oldBurst, newBurst) => {
		var matchingMessages = newBurst.getItems().filter((message) => {
			return oldBurst.hasItem(message);
		});

		return matchingMessages.length > 0;
	}

	const addBurst = (bursts, burst) => {
		bursts.push(burst);

		return true;
	}

	const mergeBurst = (oldBurst, newBurst) => {
		var newMessages = newBurst.getItems().filter((message) => {
			return !oldBurst.hasItem(message);
		});

		newMessages.forEach((message) => {
			oldBurst.addItem(message);
		});

		return true;
	}

	const addBurstOrMerge = (bursts, burst) => {
		var possibleMatches = bursts.filter((oldBurst) => {
			return hasMatchingMessage(oldBurst, burst);
		});

		if (possibleMatches.length === 0) {
			return addBurst(bursts, burst);
		}

		if (possibleMatches.length === 1) {
			return mergeBurst(possibleMatches[0], burst);
		}

		if (possibleMatches.length > 1) {
			errorService.criticalError(new Error("Burst merging possible matches > 1 wtf..."));
			return false;
		}
	}

	export const mergeBursts = (bursts, newBursts) => {
		return newBursts.reduce((prev, burst) => {
			return prev && addBurstOrMerge(bursts, burst);
		}, true);
	}
}

@IonicPage({
	name: "Messages",
	segment: "messages/:chatID",
	defaultHistory: ["Home"]
})
@Component({
	selector: 'page-messages',
	templateUrl: 'messages.html'
})
export class MessagesPage {
	chatID: number;
	chat: Chat;

	messagesLoading: boolean = true;

	burstTopic: number = 0;
	bursts: any[] = [];
	lastMessageElement: any;

	messages: any[];

	constructor(public navParams: NavParams, private element: ElementRef) {
	}

	ngOnInit() {
		this.chatID = parseFloat(this.navParams.get("chatID"));

		initService.awaitLoading().then(() =>
			messageService.getChat(this.chatID)
		).then((chat) => {
			this.chat = chat;

			chat.loadInitialMessages().then(() => {
				this.messagesLoading = false;
				this.chat.markRead().catch(errorService.criticalError)
			});
		})
	}

	ionViewDidEnter = () => {}

	getPartners = () => {
		if (!this.chat) {
			return []
		}

		return this.chat.getPartners()
	}

	private getBursts = (options) => {
		if (!this.chat || this.chat.getMessages().length === 0) {
			return { changed: false, bursts: [] };
		}

		const messages = this.chat.getMessages()
			.map(({ id }) => MessageLoader.getLoaded(id))

		if (this.burstTopic !== this.chat.getID()) {
			this.bursts = BurstHelper.calculateBursts(messages);
			this.burstTopic = this.chat.getID();

			return { changed: true, bursts: this.bursts };
		}

		var newElements = BurstHelper.getNewElements(messages, this.bursts);

		if (options) {
			const firstViewMessage = messages.find((elem) => {
				return options.after == elem.getClientID().toString()
			})

			const index = messages.indexOf(firstViewMessage)

			newElements = newElements.filter((element) => {
				return messages.indexOf(element) > index
			})
		}

		if (newElements.length === 0) {
			return { changed: false, bursts: this.bursts };
		}

		this.bursts.forEach((burst) =>
			burst.removeAllExceptLast()
		)

		var newBursts = BurstHelper.calculateBursts(messages);
		if (!BurstHelper.mergeBursts(this.bursts, newBursts)) {
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
		if (!this.chat || !this.chat.isUnread()) {
			return
		}

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

		document.querySelector("topicwithbursts .messages__list").addEventListener("scroll", this.onElementInView)
	}

	loadMoreMessages = () => {
		console.warn("load more messages")

		this.messagesLoading = true;

		return this.chat.loadMoreMessages().then(() => {
			this.messagesLoading = false;
			return
		})
	}

	messageBursts = (options) => {
		var burstInfo = this.getBursts(options);

		burstInfo.bursts.sort((b1, b2) => {
			return b1.firstItem().getTime() - b2.firstItem().getTime();
		});

		return burstInfo;
	}

	markRead = () => {
		setTimeout(() => {
			console.log('mark topic read', this.chat.getID())
			this.chat.markRead().catch(errorService.criticalError)
		}, 0)
	}

	sendMessage = ({ images = [], text, voicemails = [] }) => {
		if (text.length === 0 && images.length === 0 && voicemails.length === 0) {
			return;
		}

		messageService.sendMessage(this.chat.getID(), text, { images, files: [], voicemails }).then(() => {
			this.chat.newMessage = "";
			this.markRead();
		});
	}
}
