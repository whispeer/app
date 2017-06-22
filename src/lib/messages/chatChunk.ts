import h from "../helper/helper";
const validator = require("validation/validator");
import Observer from "../asset/observer"
const SecuredData = require("asset/securedDataWithMetaData");
import * as Bluebird from "bluebird"
const debug = require("debug");

const userService = require("user/userService");
import socket from "../services/socket.service"
import ObjectLoader from "../services/objectLoader"
const keyStore = require("services/keyStore.service").default;
const sessionService = require("services/session.service").default;

import { Message } from "./message"

const debugName = "whispeer:chunk";
const chunkDebug = debug(debugName);

declare const startup: number

export class Chunk extends Observer {
	private meta
	private receiver
	private id
	private createTime
	private successorID: number
	private receiverObjects: any[]

	constructor(data) {
		super()

		var err = validator.validate("topic", data.meta);
		if (err) {
			throw err;
		}

		data.meta.receiver.sort();

		this.meta = SecuredData.load(undefined, data.meta, {
			type: "topic", // Keep topic for now until lots of clients have picked up the change
			alternativeType: "chatChunk" // Allow for chatChunk already
		});

		this.id = data.server.id
		this.createTime = data.server.createTime

		this.receiver = this.meta.metaAttr("receiver");
	}

	awaitEarlierSend = (time) => {
		/*var previousMessages = this.getNotSentMessages().filter((message) => {
			return message.getTime() < time;
		});

		if (previousMessages.length === 0) {
			return Bluebird.resolve();
		}

		return previousMessages[previousMessages.length - 1].sendContinously();*/
	}

	getSecuredData = () => {
		return this.meta;
	}

	getHash = () => {
		return this.meta.getHash();
	}

	getID = () => {
		return h.parseDecimal(this.id);
	};

	getTime = () => {
		if (this.createTime) {
			return this.createTime
		}

		return this.getSecuredData().metaAttr("createTime");
	};

	getKey = () => {
		return this.meta.metaAttr("_key");
	};

	ensureChunkChain = (predecessor) => {
		if (this.getID() === predecessor.getID()) {
			return
		}

		var predecessorID = this.getPredecessorID()

		if (!predecessorID || !ChunkLoader.isLoaded(predecessorID)) {
			throw new Error(`Chunk chain broken ${predecessorID}`)
		}

		ChunkLoader.getLoaded(predecessorID).ensureChunkChain(predecessor)
	}

	verify = () => {
		return Bluebird.try(() => {
			return userService.get(this.meta.metaAttr("creator"));
		}).then((creator) => {
			if (creator.isNotExistingUser()) {
				// TODO this.data.disabled = true;
				return false;
			}

			return this.meta.verify(creator.getSignKey()).thenReturn(true);
		}).then((addEncryptionIdentifier) => {
			if (addEncryptionIdentifier) {
				keyStore.security.addEncryptionIdentifier(this.meta.metaAttr("_key"));
			}
		})
	};

	loadReceiverNames = h.cacheResult<Bluebird<any>>(() => {
		return Bluebird.try(() => {
			return userService.getMultipleFormatted(this.receiver)
		}).then((receiverObjects) => {
			this.receiverObjects = receiverObjects
		})
	});

	getPartners = () => {
		return this.receiverObjects.filter((receiverObject) => {
			return !receiverObject.user.isOwn() || this.receiverObjects.length === 1
		});
	}

	getPartnerDisplay = (maxDisplay = 3) => {
		const partners = this.getPartners()

		if (partners.length <= maxDisplay) {
			return partners
		}

		return partners.slice(0, maxDisplay - 1)
	}

	getReceiver = () => {
		return this.receiver
	}

	load = () => {
		return Bluebird.all([
			this.verify(),
			this.loadReceiverNames(),
		]).then(() => {
			var predecessorID = this.getPredecessorID()

			if (predecessorID && ChunkLoader.isLoaded(predecessorID)) {
				ChunkLoader.getLoaded(predecessorID).setSuccessor(this.getID())
			}
		}).finally(() => {
			chunkDebug(`Chunk loaded (${this.getID()}):${new Date().getTime() - startup}`);
		})
	};

	isAdmin = (user) => {
		return this.getCreator() === user.getID()
	}

	amIAdmin = () => {
		return this.isAdmin(userService.getown())
	}

	getCreator = () => {
		return h.parseDecimal(this.meta.metaAttr("creator"))
	}

	addReceivers = (newReceiverIDs, canReadOldMessages) => {
		var oldReceivers = this.getReceiver()

		return this.setReceivers(oldReceivers.concat(newReceiverIDs), {
			addedReceivers: [].concat(newReceiverIDs)
		}, canReadOldMessages)
	}

	setReceivers = (receivers, extraMeta, canReadOldMessages) => {
		if (!this.amIAdmin()) {
			throw new Error("Not an admin of this chunk")
		}

		return this.getSuccessor().then((successor) => {
			if (successor) {
				throw new Error("TODO: Chunk has a successor. Try again?")
			}

			return Chunk.createRawData(receivers, this, extraMeta)
		}).then((chunkData) => {
			if (!canReadOldMessages) {
				return chunkData
			}

			// TODO:  encrypt this chunks (and previous chunks) key with new chunks key

			throw new Error("not yet implemented")
		}).then((chunkData) => {
			return socket.emit("chat.chunk.create", {
				predecessorID: this.getID(),
				chunk: chunkData.chunk,
				keys: chunkData.keys,
				receiverKeys: chunkData.receiverKeys
			})
		}).then((response) => {
			return ChunkLoader.load(response.successorChunk)
		})
	}

	hasPredecessor = () => {
		return !!this.meta.metaAttr("predecessor")
	}

	getPredecessorID = () => {
		if (!this.hasPredecessor()) {
			return null
		}

		return h.parseDecimal(this.meta.metaAttr("predecessor"))
	}

	getPredecessor = () => {
		if (!this.hasPredecessor()) {
			return Bluebird.resolve(null)
		}

		return ChunkLoader.get(this.getPredecessorID()).catch((err) => {
			console.log(err)
			return null
		}, socket.errors.Server)
	}

	setSuccessor = (successorID) => {
		this.successorID = successorID

		console.warn("Set successor of chunk " , this.getID(), " succ: ", successorID)

		this.notify({ successorID: successorID }, "successor")
	}

	hasKnownSuccessor = () => {
		return !!this.successorID
	}

	getLoadedSuccessor = () => {
		if (!this.hasKnownSuccessor()) {
			return
		}

		return ChunkLoader.getLoaded(this.successorID)
	}

	getSuccessor = () => {
		if (this.successorID) {
			return ChunkLoader.get(this.successorID)
		}

		return socket.emit("chat.chunk.successor", { id: this.getID() }).then((response) => {
			if (!response.chunk) {
				return
			}

			return ChunkLoader.load(response.chunk).then((successorChunk) => {
				if (successorChunk.getPredecessorID() !== this.getID()) {
					throw new Error("server returned invalid successor chunk")
				}

				return successorChunk
			})
		})
	}

	static loadChunkChain(newChunk, oldChunk) {
		if (newChunk.getPredecessorID() === oldChunk.getID()) {
			return Bluebird.resolve()
		}

		return newChunk.getPredecessor().then((pred) => {
			if (!pred) {
				return
			}

			if (pred.getID() === oldChunk.getID()) {
				return
			}

			return Chunk.loadChunkChain(pred, oldChunk)
		})
	}

	static createRawData(receiver, predecessorChunk = null, extraMeta = {}) {
		var receiverObjects, chunkKey;
		return Bluebird.try(() => {
			//load receiver
			receiver = receiver.map((val) => {
				if (typeof val === "object") {
					return val.getID();
				} else {
					return h.parseDecimal(val);
				}
			});

			h.removeArray(receiver, sessionService.getUserID());

			//get receiver objects
			return userService.getMultiple(receiver);
		}).then((receiverO) => {
			receiverObjects = receiverO;

			//generate chunk key
			return keyStore.sym.generateKey(null, "chunkMain");
		}).then((key) => {
			chunkKey = key;

			//encrypt chunk key with own mainkey
			return keyStore.sym.symEncryptKey(chunkKey, userService.getown().getMainKey());
		}).then(() => {
			//encrypt chunk key for receiver
			return Bluebird.all(receiverObjects.map((receiverObject) => {
				var crypt = receiverObject.getCryptKey();
				return keyStore.sym.asymEncryptKey(chunkKey, crypt);
			}));
		}).then((cryptKeys) => {
			var cryptKeysData = keyStore.upload.getKeys(cryptKeys);
			var receiverKeys = {}, receiverIDs = [];

			receiverObjects.forEach((receiver, index) => {
				receiverIDs.push(receiver.getID());
				receiverKeys[receiver.getID()] = cryptKeys[index];
			});

			receiverIDs.push(userService.getown().getID());
			receiverIDs.sort();

			const predecessorInfo = predecessorChunk ? {
				predecessor: predecessorChunk.getID()
			} : {}

			// chunk signable data.
			var chunkMeta = {
				createTime: new Date().getTime(),
				receiver: receiverIDs,
				creator: userService.getown().getID(),
				...extraMeta,
				...predecessorInfo
			}

			//create data
			var chunkData = {
				keys: cryptKeysData.concat([keyStore.upload.getKey(chunkKey)]),
				receiverKeys: receiverKeys
			};

			var secured = SecuredData.createRaw({}, chunkMeta, { type: "topic" })

			if (predecessorChunk) {
				secured.setParent(predecessorChunk.getSecuredData())
			}

			return secured.signAndEncrypt(userService.getown().getSignKey(), chunkKey).then((cData) => {
				return {
					...chunkData,
					chunk: cData.meta
				}
			})
		})
	};

	static createData(receiver, message, images) {
		var imagePreparation = Bluebird.resolve(images).map((image: any) => {
			return image.prepare()
		})

		const uploadImages = (chunkKey) => {
			return Bluebird.all(images.map((image) => {
				return image.upload(chunkKey)
			}))
		}

		return Bluebird.all([Chunk.createRawData(receiver), imagePreparation]).spread((chunkData: any, imagesMeta) => {
			var chunk = new Chunk({
				meta: chunkData.chunk,
				server: {},
				unread: []
			});

			var messageMeta = {
				createTime: new Date().getTime(),
				images: imagesMeta
			};

			return Bluebird.all([
				chunkData,
				Message.createRawData(message, messageMeta, chunk),
				uploadImages(chunk.getKey())
			]);
		}).spread((chunkData, messageData, imageKeys: any) => {
			imageKeys = h.array.flatten(imageKeys);
			messageData.imageKeys = imageKeys.map(keyStore.upload.getKey);

			chunkData.message = messageData;

			return chunkData;
		})
	};
}

Observer.extend(Chunk);

const loadHook = (chunkResponse) => {
	const chunk = new Chunk(chunkResponse)

	return chunk.load().thenReturn(chunk)
}

const downloadHook = (id) => {
	return socket.emit("chat.chunk.get", { id })
}

const hooks = {
	downloadHook, loadHook
}

export default class ChunkLoader extends ObjectLoader(hooks) {}
