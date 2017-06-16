import * as Bluebird from "bluebird"
import h from "../helper/helper"

var userService = require("user/userService");
var socket = require("services/socket.service").default;
var keyStore = require("services/keyStore.service").default;

var SecuredData = require("asset/securedDataWithMetaData");
import ObjectLoader from "../services/objectLoader"

import { Chunk } from "./chatChunk"

export class Message {
	private _hasBeenSent: boolean
	private _isDecrypted: boolean
	private _isOwnMessage: boolean

	private _serverID: number
	private _messageID: any
	private _securedData: any
	private _images: any[]

	private sendTime: number
	private senderID: number

	private data: any

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
		const { meta, content, server } = data

		this._hasBeenSent = true;
		this._isDecrypted = false;

		var id = Message.idFromData(data)

		this.chunkID = server.chunkID

		this.sendTime = h.parseDecimal(server.sendTime)
		this.senderID = h.parseDecimal(server.sender)

		this._serverID = id.serverID
		this._messageID = id.messageID

		var metaCopy = h.deepCopyObj(meta);
		this._securedData = SecuredData.load(content, metaCopy, {
			type: "message"
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
			sender: userService.getown().getID()
		};

		this._securedData = Message.createRawSecuredData(chunk, message, meta);

		this.setData();

		this.data.text = message;
		this.data.images = images.map((image) => {
			if (!image.convertForGallery) {
				return image;
			}

			return image.convertForGallery();
		});

		this.loadSender();
		this._prepareImages();
	};

	_prepareImages = h.cacheResult<Bluebird<any>>(() => {
		return Bluebird.resolve(this._images).map((image: any) => {
			return image.prepare();
		});
	})

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

	getChunkID = () => {
		return this.chunkID
	}

	hasBeenSent = () => {
		return this._hasBeenSent;
	};

	uploadImages = h.cacheResult((chunkKey) => {
		return this._prepareImages().then(() => {
			return Bluebird.all(this._images.map((image) => {
				return image.upload(chunkKey);
			}));
		}).then((imageKeys) => {
			return h.array.flatten(imageKeys);
		});
	})

	sendContinously = h.cacheResult<any>(() => {
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
			return this._prepareImages();
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
				this.sendTime = h.parseDecimal(response.server.sendTime)
				this._serverID = h.parseDecimal(response.server.id)
				this.data.timestamp = this.getTime();
			}

			return response.success;
		}).catch(socket.errors.Disconnect, (e) => {
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
			return this.sendTime;
		}

		return h.parseDecimal(this._securedData.metaAttr("createTime"));
	};

	isOwn = () => {
		return this._isOwnMessage;
	};

	loadSender = () => {
		return Bluebird.try(() => {
			return userService.get(this.senderID);
		}).then((sender) => {
			return sender.loadBasicData().thenReturn(sender);
		}).then((sender) => {
			this.data.sender = sender.data;
			this._isOwnMessage = sender.isOwn();

			return sender;
		});
	};

	load = () => {
		return this.loadSender().then((sender) => {
			return Bluebird.all([
				this.decrypt(),
				this.verify(sender.getSignKey())
			]);
		}).then(() => {
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

	getText = () => {
		return this.data.text
	}

	decrypt = () => {
		if (this._isDecrypted) {
			return Bluebird.resolve(this.data.text)
		}

		return Bluebird.try(() => {
			return this._securedData.decrypt();
		}).then(() => {
			this.data.text = this._securedData.contentGet();
			return this._securedData.contentGet();
		})
	}

	static createData(chunk, message, imagesMeta, cb) {
		return Bluebird.try(() => {
			var newest = chunk.data.latestMessage;

			var meta = {
				createTime: new Date().getTime(),
				images: imagesMeta
			};

			var mySecured = Message.createRawSecuredData(chunk, message, meta);
			mySecured.setAfterRelationShip(newest.getSecuredData());
			return mySecured._signAndEncrypt(userService.getown().getSignKey(), chunk.getKey());
		}).then((mData) => {
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
		});
		secured.setParent(chunk.getSecuredData());

		return secured;
	};

	static createRawData(chunk, message, meta) {
		var secured = Message.createRawSecuredData(chunk, message, meta);
		return secured._signAndEncrypt(userService.getown().getSignKey(), chunk.getKey());
	};

	static idFromData(data) {
		var serverID = h.parseDecimal(data.server.id);
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

export default class MessageLoader extends ObjectLoader<Message>(hooks) {}
