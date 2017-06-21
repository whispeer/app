import h from "../helper/helper"

import TopicUpdate from "./topicTitleUpdate"

const MINUTE = 60 * 1000;

export default class Burst {
	private items
	private chunk

	constructor (chunk) {
		this.items = []
		this.chunk = chunk
	}

	getItems = () => {
		return this.items;
	}

	hasItem = (item) => {
		return this.items.indexOf(item) > -1;
	}

	addItem = (item) => {
		debugger
		if (!this.hasItems()) {
			this.chunk = item.getChunk()
		}

		this.items.push(item);

		this.items.sort(function (m1, m2) {
			return m1.getTime() - m2.getTime();
		});
	}

	removeAllExceptLast = () => {
		this.items.splice(0, this.items.length - 1);
	}

	firstItem = () => {
		return this.items[0];
	}

	lastItem = () => {
		return this.items[this.items.length - 1];
	}

	isMessageBurst = () => {
		return !this.isChunkUpdate();
	}

	private _isItemChunkUpdate = (item) => {
		return item instanceof TopicUpdate;
	}

	isChunkUpdate = () => {
		return this._isItemChunkUpdate(this.firstItem());
	}

	hasItems = () => {
		return this.items.length > 0;
	}

	fitsItem = (item) => {
		if (!this.hasItems()) {
			return true;
		}

		if (this._isItemChunkUpdate(this.firstItem()) || this._isItemChunkUpdate(item)) {
			return false;
		}

		return this.sameChunk(item) &&
			this.sameSender(item) &&
			this.sameDay(item) &&
			this.timeDifference(item) < MINUTE * 10;

	}

	getChunk = () => {
		return this.chunk
	}

	getChunkID = () => {
		return this.getChunk().getID()
	}

	sameChunk = (burst: Burst) => {
		if (!burst) {
			return false;
		}

		return this.getChunkID() === burst.getChunkID();
	}

	sameSender = (message) => {
		return this.firstItem().data.sender.id === message.data.sender.id;
	}

	sameDay = (message) => {
		if (!message) {
			return false;
		}

		if (message instanceof Burst) {
			message = message.firstItem();
		}

		var date1 = new Date(h.parseDecimal(this.firstItem().getTime()));
		var date2 = new Date(h.parseDecimal(message.getTime()));

		if (date1.getDate() !== date2.getDate()) {
			return false;
		}

		if (date1.getMonth() !== date2.getMonth()) {
			return false;
		}

		if (date1.getFullYear() !== date2.getFullYear()) {
			return false;
		}

		return true;
	}

	timeDifference = (item) => {
		return Math.abs(h.parseDecimal(item.getTime()) - h.parseDecimal(this.firstItem().getTime()));
	}

	isMe = () => {
		return this.isMessageBurst() && this.firstItem().data.sender.me;
	}

	isOther = () => {
		return this.isMessageBurst() && !this.firstItem().data.sender.me;
	}

	sender = () => {
		return this.firstItem().data.sender;
	}
}
