import { Message } from "../messages/message"
import h from "../helper/helper"

const MINUTE = 60 * 1000;

export const sameDay = (message1, message2) => {
	if (!message1 || !message2) {
		return false;
	}

	var date1 = new Date(h.parseDecimal(message1.getTime()));
	var date2 = new Date(h.parseDecimal(message2.getTime()));

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

const sameSender = (m1, m2) => m1.data.sender.id === m2.data.sender.id

export const sameChunk = (m1: Message, m2: Message) =>
	m1 && m2 && m1.getChunkID() === m2.getChunkID()

const timeDifference = (m1, m2) =>
	Math.abs(h.parseDecimal(m1.getTime()) - h.parseDecimal(m2.getTime()));

const continousMessage = (m1: Message, m2: Message) =>
	m1.getPreviousID() === m2.getClientID() || m2.getPreviousID() === m1.getClientID()

export const sameBurst = (m1: Message, m2: Message) => {
	return sameChunk(m1, m2) &&
		sameSender(m1, m2) &&
		continousMessage(m1, m2) &&
		sameDay(m1, m2) &&
		timeDifference(m1, m2) < MINUTE * 10
}
