var SecuredData = require("asset/securedDataWithMetaData");
var h = require("whispeerHelper");

var userService = require("user/userService");
var socket = require("services/socket.service").default;

import * as Bluebird from "bluebird"

export default class TopicUpdate {
	state: any
	private _id: any
	private _securedData: any
	private _userID: any

	constructor(updateData) {
		var content = updateData.content,
			meta = updateData.meta;

		this._id = updateData.id;
		this._securedData = SecuredData.load(content, meta, { type: "topicUpdate" });
		this._userID = meta.userID;

		this.state = {
			loading: true,
			timestamp: h.parseDecimal(updateData.meta.time)
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
		return h.parseDecimal(this._securedData.metaAttr("time"));
	};

	isAfter = (topicUpdate) => {
		if (!topicUpdate) {
			return true;
		}

		return topicUpdate.getTime() < this.getTime();
	};

	protected decryptAndVerify = h.executeOnce(() => {
		return Bluebird.try(async () => {
			const user = await this.getUser()

			this.setState({
				sender: user
			});

			const decryptPromise = this._securedData.decrypt()
			const verifyPromise = this._securedData.verify(user.getSignKey())

			await verifyPromise

			return await decryptPromise
		})
	});

	protected load() {
		return this.decryptAndVerify()
	}

	ensureParent = (topic) => {
		this._securedData.checkParent(topic.getSecuredData());
	};

	ensureIsAfterTopicUpdate = (topicUpdate) => {
		this._securedData.checkAfter(topicUpdate.getSecuredData());
	};

	getUserID = () => {
		return this._userID;
	};

	getUser = () => {
		return userService.get(this.getUserID());
	};

	getSecuredData = () => {
		return this._securedData;
	};

	getMetaUpdate = () => {
		return this._securedData.metaAttr("metaUpdate")
	}

	static create(topic, previousTopicUpdate, { meta, content }: { meta?, content? }) {
		var topicContainer = topic.getSecuredData();
		var topicUpdatePromisified = SecuredData.createPromisified(content, {
				userID: userService.getown().getID(),
				time: new Date().getTime(),
				metaUpdate: meta
			}, { type: "topicUpdate" }, userService.getown().getSignKey(), topicContainer.getKey());

		topicUpdatePromisified.data.setParent(topicContainer);

		if (previousTopicUpdate) {
			topicUpdatePromisified.data.setAfterRelationShip(previousTopicUpdate.getSecuredData());
		}

		return topicUpdatePromisified.promise.then(function(topicUpdateData) {
			return socket.emit("messages.createTopicUpdate", {
				topicID: topic.getID(),
				topicUpdate: topicUpdateData
			}).then(function(response) {
				topicUpdateData.id = response.id;

				return topicUpdateData;
			});
		});
	};
}
