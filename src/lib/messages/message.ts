import * as Bluebird from "bluebird"
import h from "../helper/helper"

var userService = require("user/userService");
var socket = require("services/socket.service").default;
var keyStore = require("services/keyStore.service").default;

var SecuredData = require("asset/securedDataWithMetaData");
import ObjectLoader from "../services/objectLoader"

import { Chunk } from "./chatChunk"

var notVerified = ["sendTime", "sender", "topicid", "messageid"];

export class Message {
	_hasBeenSent: any
	_isDecrypted: any
	_serverID: any
	_messageID: any
	_securedData: any
	_isOwnMessage: any
	_images: any
	data: any
	_prepareImagesPromise: any
	imageUploadPromise: any

	private chunk: any
	private chunkID: number

	constructor(messageData, chunk?: Chunk, images?, id?) {
		if (!chunk) {
			this.fromSecuredData(messageData);
			return
		}

		this.fromDecryptedData(chunk, messageData, images, id);
	}

	fromSecuredData = (data) => {
		this._hasBeenSent = true;
		this._isDecrypted = false;

		var id = Message.idFromData(data)

		this.chunkID = data.server.chunkID

		this._serverID = id.serverID
		this._messageID = id.messageID

		var metaCopy = h.deepCopyObj(data.meta);
		this._securedData = SecuredData.load(data.content, metaCopy, {
			type: "message",
			attributesNotVerified: notVerified
		});

		this.setData();
	};

	fromDecryptedData = (chunk, message, images, id) => {
		this._hasBeenSent = false;
		this._isDecrypted = true;
		this._isOwnMessage = true;

		this.chunk = chunk;
		this.chunkID = chunk.getID()
		this._images = images;

		this._messageID = id || h.generateUUID();

		var meta = {
			createTime: new Date().getTime(),
			messageUUID: this._messageID,
			sender:userService.getown().getID()
		};

		this._securedData = Message.createRawSecuredData(chunk, message, meta);

		this.setData();

		this.data.text = message;
		this.data.images = images.map(function (image) {
			if (!image.convertForGallery) {
				return image;
			}

			return image.convertForGallery();
		});

		this.loadSender();
		this._prepareImages();
	};

	_prepareImages = () => {
		this._prepareImagesPromise = Bluebird.resolve(this._images).map(function (image: any) {
			return image.prepare();
		});
	};

	setData = () => {
		this.data = {
			text: "",
			timestamp: this.getTime(),
			date: new Date(this.getTime()),

			loading: true,
			loaded: false,
			sent: this._hasBeenSent,

			sender: {
				"id": this._securedData.metaAttr("sender"),
				"name": "",
				"url": "",
				"image": "assets/img/user.png"
			},

			images: this._securedData.metaAttr("images"),

			id: this._messageID,
			obj: this
		};
	};

	hasBeenSent = () => {
		return this._hasBeenSent;
	};

	uploadImages = (chunkKey) => {
		if (!this.imageUploadPromise) {
			this.imageUploadPromise = this._prepareImagesPromise.bind(this).then(function () {
				return Bluebird.all(this._images.map(function (image) {
					return image.upload(chunkKey);
				}));
			}).then(function (imageKeys) {
				return h.array.flatten(imageKeys);
			});
		}

		return this.imageUploadPromise;
	};

	sendContinously = h.cacheResult(() => {
		return h.repeatUntilTrue(Bluebird, () => {
			return this.send();
		}, 2000);
	})

	send = () => {
		if (this._hasBeenSent) {
			throw new Error("trying to send an already sent message");
		}

		return socket.awaitConnection().then(() => {
			return [this.chunk.refetchMessages(), this.chunk.loadNewest()];
		}).then(() => {
			return this.chunk.awaitEarlierSend(this.getTime());
		}).then(() => {
			return this._prepareImagesPromise;
		}).then((imagesMeta) => {
			this._securedData.metaSetAttr("images", imagesMeta);

			var chunkKey = this.chunk.getKey();
			var newest = this.chunk.getNewest();

			if (newest && newest.getChunkID() === this.chunk.getID()) {
				this._securedData.setAfterRelationShip(newest.getSecuredData());
			}

			var signAndEncryptPromise = this._securedData._signAndEncrypt(userService.getown().getSignKey(), chunkKey);

			return Bluebird.all([signAndEncryptPromise, this.uploadImages(chunkKey)]);
		}).spread((result, imageKeys) => {
			result.meta.topicid = this.chunk.getID();
			result.imageKeys = imageKeys.map(keyStore.upload.getKey);

			return socket.emit("messages.send", {
				message: result
			});
		}).then((response) => {
			if (response.success) {
				this._hasBeenSent = true;
				this.data.sent = true;
			}

			if (response.server) {
				this._securedData.metaSetAttr("sendTime", response.server.sendTime);
				this._serverID = response.server.messageid;
				this.data.timestamp = this.getTime();
			}

			return response.success;
		}).catch(socket.errors.Disconnect, function (e) {
			console.warn(e);
			return false;
		});
	};

	getSecuredData = () => {
		return this._securedData;
	};

	getServerID = () => {
		return this._serverID;
	};

	getID = () => {
		return this._messageID;
	};

	getTopicID = () => {
		return this.chunkID
	}

	getTime = () => {
		if (this.getServerID()) {
			return h.parseDecimal(this._securedData.metaAttr("sendTime"));
		} else {
			return h.parseDecimal(this._securedData.metaAttr("createTime"));
		}
	};

	isOwn = () => {
		return this._isOwnMessage;
	};

	loadSender = () => {
		var theMessage = this;

		return Bluebird.try(function () {
			return userService.get(theMessage._securedData.metaAttr("sender"));
		}).then(function loadS1(sender) {
			return sender.loadBasicData().thenReturn(sender);
		}).then(function loadS2(sender) {
			theMessage.data.sender = sender.data;
			theMessage._isOwnMessage = sender.isOwn();

			return sender;
		});
	};

	load = () => {
		return this.loadSender().then((sender) => {
			return Bluebird.all([
				this.decrypt(),
				this.verify(sender.getSignKey())
			]);
		}).then(function () {
			return;
		})
	};

	verifyParent = (chunk) => {
		this._securedData.checkParent(chunk.getSecuredData())
	};

	verify = (signKey) => {
		if (!this._hasBeenSent) {
			throw new Error("verifying unsent message")
		}

		return this._securedData.verify(signKey)
	};

	decrypt = () => {
		if (this._isDecrypted) {
			return Bluebird.resolve(this.data.text)
		}

		var theMessage = this;
		return Bluebird.try(function () {
			return theMessage._securedData.decrypt();
		}).then(function () {
			theMessage.data.text = theMessage._securedData.contentGet();
			return theMessage._securedData.contentGet();
		})
	}

	static createData(chunk, message, imagesMeta, cb) {
		return Bluebird.try(function () {
			var newest = chunk.data.latestMessage;

			var meta = {
				createTime: new Date().getTime(),
				images: imagesMeta
			};

			var mySecured = Message.createRawSecuredData(chunk, message, meta);
			mySecured.setAfterRelationShip(newest.getSecuredData());
			return mySecured._signAndEncrypt(userService.getown().getSignKey(), chunk.getKey());
		}).then(function (mData) {
			mData.meta.topicid = chunk.getID();

			var result = {
				message: mData
			};

			return result;
		}).nodeify(cb);
	};

	static createRawSecuredData(chunk, message, meta) {
		var secured = SecuredData.createRaw(message, meta, {
			type: "message",
			attributesNotVerified: notVerified
		});
		secured.setParent(chunk.getSecuredData());

		return secured;
	};

	static createRawData(chunk, message, meta) {
		var secured = Message.createRawSecuredData(chunk, message, meta);
		return secured._signAndEncrypt(userService.getown().getSignKey(), chunk.getKey());
	};

	static idFromData(data) {
		var serverID = h.parseDecimal(data.meta.messageid || data.messageid);
		var messageID = data.meta.messageUUID || serverID;

		return {
			serverID: serverID,
			messageID: messageID
		}
	}
}

const loadHook = (messageResponse) => {
	const message = new Message(messageResponse)

	return message.load().thenReturn(message)
}

const downloadHook = (id) => {
	return socket.emit("chat.message.get", { id })
}

const hooks = {
	downloadHook, loadHook
}

export default class MessageLoader extends ObjectLoader(hooks) {}
