var SecuredData = require("asset/securedDataWithMetaData");
import h from "../helper/helper"

var userService = require("users/userService").default;

import * as Bluebird from "bluebird"

export default class TopicUpdate {
	state: any
	private _id: any
	private securedData: any
	private userID: any

	constructor(updateData) {
		var content = updateData.content,
			meta = updateData.meta;

		this._id = updateData.server.id;
		this.securedData = SecuredData.load(content, meta, { type: "topicUpdate" });
		this.userID = meta.userID;

		this.state = {
			loading: true,
			timestamp: h.parseDecimal(updateData.meta.time),
			title: ""
		};
	}

	setState = (newState) => {
		this.state = {
			...this.state,
			...newState
		};
	};

	getID = () => {
		return this._id;
	};

	getTime = () => {
		return h.parseDecimal(this.securedData.metaAttr("time"));
	};

	isAfter = (topicUpdate) => {
		if (!topicUpdate) {
			return true;
		}

		return topicUpdate.getTime() < this.getTime();
	};

	protected decryptAndVerify = h.cacheResult<Bluebird<any>>(() => {
		return Bluebird.try(async () => {
			const userID = this.userID
			const securedData = this.securedData

			const sender = await userService.get(userID);

			await Bluebird.all([
				securedData.decrypt(),
				securedData.verify(sender.getSignKey())
			])

			return {
				content: securedData.contentGet(),
				sender
			}
		})
	});

	load() {
		return Bluebird.try(async () => {
			const { content, sender } = await this.decryptAndVerify()

			this.setState({
				title: content.title,
				loading: false,
				sender
			});

			return content;
		})
	}

	ensureParent = (topic) => {
		this.securedData.checkParent(topic.getSecuredData());
	}

	ensureIsAfterTopicUpdate = (topicUpdate) => {
		this.securedData.checkAfter(topicUpdate.getSecuredData());
	}

	getUserID = () => {
		return this.userID;
	}

	getSecuredData = () => {
		return this.securedData;
	}

	getMetaUpdate = () => {
		return this.securedData.metaAttr("metaUpdate")
	}

	getTitle = () => {
		return this.load().then((content) => {
			return content.title;
		})
	}
}
