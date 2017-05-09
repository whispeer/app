var Bluebird = require("bluebird");
var SecuredData = require("asset/securedDataWithMetaData");
var h = require("whispeerHelper");

var userService = require("user/userService");
var socket = require("services/socket.service").default;

interface stateInterface {
	title?: string,
	loading?: boolean,
	timestamp?: number,
	sender?: any
}

class TopicUpdate {
	state: stateInterface
	private _id: any
	private _securedData: any
	private _userID: any
	private _loadPromise: any

	constructor(updateData) {
		var content = updateData.content,
			meta = updateData.meta;

		this.state = {
			title: "",
			loading: true,
			timestamp: h.parseDecimal(meta.time)
		};

		this._id = updateData.id;
		this._securedData = SecuredData.load(content, meta, { type: "topicUpdate" });
		this._userID = meta.userID;
	}

	setState = (newState: stateInterface) => {
		this.state = {
			...this.state,
			newState
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

	load = () => {
		if (!this._loadPromise) {
			this._loadPromise = this.getUser().bind(this).then((user) => {
				this.setState({
					sender: user
				});

				return Bluebird.all([
					this._securedData.decrypt(),
					this._securedData.verify(user.getSignKey())
				]);
			}).spread((content: { title: string }) => {
				this.setState({
					title: content.title,
					loading: false
				});

				return content;
			});
		}

		return this._loadPromise;
	};

	ensureParent = (topic) => {
		this._securedData.checkParent(topic.getSecuredData());
	};

	ensureIsAfterTopicUpdate = (topicUpdate) => {
		this._securedData.checkAfter(topicUpdate.getSecuredData());
	};

	getTitle = () => {
		return this.load().then(function(content) {
			return content.title;
		});
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

	static create(topic, options) {
		var topicContainer = topic.getSecuredData();
		var topicUpdatePromisified = SecuredData.createPromisified({
			title: options.title || ""
		}, {
				userID: userService.getown().getID(),
				time: new Date().getTime()
			}, { type: "topicUpdate" }, userService.getown().getSignKey(), topicContainer.getKey());

		topicUpdatePromisified.data.setParent(topicContainer);

		if (options.previousTopicUpdate) {
			topicUpdatePromisified.data.setAfterRelationShip(options.previousTopicUpdate.getSecuredData());
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

module.exports = TopicUpdate;
