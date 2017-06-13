import { Component, Input } from "@angular/core";

import { TranslateService } from '@ngx-translate/core';

const h = require("whispeerHelper");

var Topic = require("messages/chatChunk")

@Component({
	selector: "BurstDifference",
	templateUrl: "burstDifference.html"
})
export class BurstDifferenceComponent {
	@Input() topic;
	@Input() burst;
	@Input() previousBurst;
	@Input() noDates;

	constructor() {}

	differentDay = () => {
		if (this.noDates || !this.topic) {
			return false
		}

		if (this.burst && this.previousBurst) {
			return !this.burst.sameDay(this.previousBurst)
		}

		return true
	}

	differentTopic = () => {
		if (!this.topic) {
			return false
		}

		if (this.burst && this.previousBurst) {
			return !this.burst.sameTopic(this.previousBurst)
		}

		if (this.previousBurst) {
			return this.previousBurst.getTopic() !== this.topic
		}

		return true
	}

	getTopicsBetween = (topic, previousTopic) => {
		if (topic.getID() === previousTopic.getID()) {
			return []
		}

		const predecessorTopic = Topic.getLoadedTopic(topic.getPredecessorID())

		if (!predecessorTopic) {
			return [topic]
		}

		return this.getTopicsBetween(predecessorTopic, previousTopic).concat([topic])
	}

	getKnownPredecessors = (topic) => {
		const predecessorTopic = Topic.getLoadedTopic(topic.getPredecessorID())

		if (!predecessorTopic) {
			return [topic]
		}

		return this.getKnownPredecessors(predecessorTopic).concat([topic])
	}

	getTopicsOfInterest = () => {
		if (this.burst && this.previousBurst) {
			return this.getTopicsBetween(this.burst.getTopic(), this.previousBurst.getTopic())
		}

		if (this.burst) {
			return this.getKnownPredecessors(this.burst.getTopic())
		}

		if (this.previousBurst) {
			return this.getTopicsBetween(this.topic, this.previousBurst.getTopic())
		}

		return [this.topic]
	}

	newPersons = (topic) => {
		return this.getAddedReceivers(topic).filter(function (u) {
			return !u.me
		})
	}

	getAddedReceivers = (topic) => {
		if (!topic.data.verified) {
			return []
		}

		return topic.data.addedReceivers
	}

	personsAdded = (topic) => {
		return this.getAddedReceivers(topic).filter(function (u) {
			return !u.me
		}).length > 0
	};

	wasIAdded = (topic) => {
		return this.getAddedReceivers(topic).some(function (u) {
			return u.me
		})
	}

	getTime = () => {
		if (this.burst) {
			return this.burst.firstItem().getTime()
		}

		return h.parseDecimal(this.topic.getTime())
	}
}
