import h from "../helper/helper";
const validator = require("validation/validator");
import Observer from "../asset/observer"
const SecuredData = require("asset/securedDataWithMetaData");
import * as Bluebird from "bluebird"
const debug = require("debug");

const userService = require("users/userService");
import socket from "../services/socket.service"
import ObjectLoader from "../services/cachedObjectLoader"
const keyStore = require("services/keyStore.service").default;
const sessionService = require("services/session.service").default;

import { Message } from "./message"
import ChatTitleUpdate from "./chatTitleUpdate"

const debugName = "whispeer:chunk";
const chunkDebug = debug(debugName);

declare const startup: number

const CHUNK_SECURED_DATA_OPTIONS = {
	type: "topic", // Keep topic for now until lots of clients have picked up the change
	alternativeType: "chatChunk" // Allow for chatChunk already
}

export class Chunk extends Observer {
	private securedData
	private receiver
	private id
	private createTime
	private successorID: number
	private predecessorID: number
	private receiverObjects: any[]
	private chatID: number
	private title: string = ""
	private admins: number[]
	private titleUpdate: ChatTitleUpdate

	constructor({ content, server, meta, receiverObjects }) {
		super()

		var err = validator.validate("topic", meta);
		if (err) {
			throw err;
		}

		meta.receiver.sort();

		this.securedData = SecuredData.createRaw(content, meta, CHUNK_SECURED_DATA_OPTIONS);

		this.id = server.id
		this.chatID = server.chatID
		this.predecessorID = server.predecessorID
		this.createTime = server.createTime

		this.receiver = this.securedData.metaAttr("receiver").map(h.parseDecimal);

		const metaAdmins = this.securedData.metaAttr("admins")
		const creator = this.securedData.metaAttr("creator")

		this.admins = (metaAdmins ? metaAdmins : [creator]).map(h.parseDecimal)

		if (this.securedData.hasContent()) {
			this.title = this.securedData.contentGet().title
		} else {
			this.title = ""
		}

		this.receiverObjects = receiverObjects

		var predecessorID = this.getPredecessorID()

		if (predecessorID && ChunkLoader.isLoaded(predecessorID)) {
			ChunkLoader.getLoaded(predecessorID).setSuccessor(this.getID())
		}
	}

	getChatID = () => this.chatID

	getSecuredData = () => {
		return this.securedData;
	}

	getHash = () => {
		return this.securedData.getHash();
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
		return this.securedData.metaAttr("_key");
	};

	setLatestTitleUpdate = (titleUpdate: ChatTitleUpdate) => {
		this.titleUpdate = titleUpdate
	}

	ensureChunkChain = (predecessor) => {
		if (this.getID() === predecessor.getID()) {
			return
		}

		var predecessorID = this.getPredecessorID()

		if (!predecessorID || !ChunkLoader.isLoaded(predecessorID)) {
			throw new Error(`Chunk chain broken ${predecessorID}`)
		}

		const predecessorChunk = ChunkLoader.getLoaded(predecessorID)

		predecessorChunk.verifyParent(this)

		predecessorChunk.ensureChunkChain(predecessor)
	}

	verifyParent = (chunk: Chunk) => {
		chunk.getSecuredData().checkParent(this.getSecuredData())
	}

	getReceivers = () => {
		return this.receiverObjects
	}

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

	getAdmins = () => {
		return this.admins
	}

	getReceiverIDs = () => {
		return this.receiver
	}

	getTitle = () => {
		if (this.titleUpdate) {
			return this.titleUpdate.state.title
		}

		return this.title
	}

	isAdmin = (user) => {
		return this.getAdmins().indexOf(user.getID()) > -1
	}

	amIAdmin = () => {
		return this.isAdmin(userService.getOwn())
	}

	getCreator = () => {
		return h.parseDecimal(this.securedData.metaAttr("creator"))
	}

	hasPredecessor = () => {
		return !!this.predecessorID
	}

	getPredecessorID = () => {
		if (!this.hasPredecessor()) {
			return null
		}

		return h.parseDecimal(this.predecessorID)
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
		if (newChunk.getID() === oldChunk.getID()) {
			return Bluebird.resolve()
		}

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

	private static createChunkKey = () => {
		return keyStore.sym.generateKey(null, "chunkMain").then((chunkKey) => {
			return keyStore.sym.symEncryptKey(chunkKey, userService.getOwn().getMainKey()).thenReturn(chunkKey)
		})
	}

	static cryptInfo = async (receiverObjectsExceptOwn) => {
		const receiverKeys = {}

		const chunkKey = await Chunk.createChunkKey()

		const cryptKeys = await Bluebird.all(receiverObjectsExceptOwn.map((receiverObject) => {
			const crypt = receiverObject.getCryptKey();
			return keyStore.sym.asymEncryptKey(chunkKey, crypt);
		}));

		const cryptKeysData = keyStore.upload.getKeys(cryptKeys);

		receiverObjectsExceptOwn.forEach((receiver, index) => {
			receiverKeys[receiver.getID()] = cryptKeys[index];
		});

		const cryptInfo = {
			keys: cryptKeysData.concat([keyStore.upload.getKey(chunkKey)]),
			receiverKeys,
		}

		return { cryptInfo, chunkKey }
	}

	static createRawData(receiver, { content = {}, meta = {}, givenKey, predecessorChunk } : { content: any, givenKey?: any, meta?: any, predecessorChunk?: Chunk}) {
		return Bluebird.try(async () => {

			const receiverIDs = receiver.map((val) => h.parseDecimal(val))

			if (receiverIDs.indexOf(sessionService.getUserID()) === -1) {
				receiverIDs.push(sessionService.getUserID())
			}

			const receiverObjects = await userService.getMultiple(receiverIDs);

			const receiverObjectsExceptOwn = receiverObjects.filter((receiver) => !receiver.isOwn())

			const givenInfo = { cryptInfo: { receiverKeys: {} }, chunkKey: givenKey}

			const { cryptInfo, chunkKey } = givenKey ? givenInfo : await Chunk.cryptInfo(receiverObjectsExceptOwn)

			receiverIDs.sort();

			const chunkMeta = {
				...meta,
				createTime: new Date().getTime(),
				receiver: receiverIDs,
				creator: userService.getOwn().getID(),
			}

			const secured = SecuredData.createRaw(content, chunkMeta, { type: "topic" })

			if (predecessorChunk) {
				secured.setParent(predecessorChunk.getSecuredData())
			}

			const cData = await secured.signAndEncrypt(userService.getOwn().getSignKey(), chunkKey)

			return Object.assign({
				chunk: cData,
			}, cryptInfo)
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

		return Bluebird.all([
			Chunk.createRawData(receiver, { content: {} }),
			imagePreparation
		]).spread((chunkData: any, imagesMeta) => {
			// create chunk stub for empty chat so we can connect it to the first message
			var chunkStub = new Chunk({
				meta: chunkData.chunk.meta,
				content: {},
				server: {},
				receiverObjects: []
			});

			var messageMeta = {
				createTime: new Date().getTime(),
				images: imagesMeta
			};

			return Bluebird.all([
				chunkData,
				Message.createRawData(message, messageMeta, chunkStub),
				uploadImages(chunkStub.getKey())
			]);
		}).spread((chunkData, messageData, imageKeys: any) => {
			imageKeys = h.array.flatten(imageKeys);
			messageData.imageKeys = imageKeys.map(keyStore.upload.getKey);

			chunkData.message = messageData;

			return chunkData;
		})
	}
}

Observer.extend(Chunk);

const loadLegacyTitle = (latestTitleUpdateResponse) => {
	if (!latestTitleUpdateResponse) {
		return Bluebird.resolve()
	}

	const latestTitleUpdate = new ChatTitleUpdate(latestTitleUpdateResponse)
	return latestTitleUpdate.getTitle().thenReturn(latestTitleUpdate)
}

type ChunkCache = {
	content: any,
	meta: any,
	server: any,
	latestTitleUpdate: any
}

export default class ChunkLoader extends ObjectLoader<Chunk, ChunkCache>({
	cacheName: "chunk",
	download: id => socket.emit("chat.chunk.get", { id }),
	restore: (chunkInfo: ChunkCache) => {
		return Bluebird.try(async () => {
			const titleUpdate = await loadLegacyTitle(chunkInfo.latestTitleUpdate)
			const loadReceiverPromise = userService.getMultipleFormatted(chunkInfo.meta.receiver.sort().map(h.parseDecimal))

			const creator = await userService.get(chunkInfo.meta.creator)

			if (!creator.isNotExistingUser()) {
				keyStore.security.addEncryptionIdentifier(chunkInfo.meta._key)
			} else {
				// TODO data.disabled = true;
			}

			const chunk = new Chunk({
				...chunkInfo,
				receiverObjects: await loadReceiverPromise
			})

			if (titleUpdate) {
				chunk.setLatestTitleUpdate(titleUpdate)
			}

			return chunk
		})
	},
	load: ({ content, meta, server, latestTitleUpdate }) : Bluebird<ChunkCache> => {
		return Bluebird.try(async () => {
			const securedData = SecuredData.load(content, meta, CHUNK_SECURED_DATA_OPTIONS)

			const creator = await userService.get(securedData.metaAttr("creator"))
			await securedData.verify(creator.getSignKey())
			await securedData.decrypt()

			return {
				content: securedData.contentGet(),
				meta: securedData.metaGet(),
				server,
				latestTitleUpdate
			}
		})
	},
	getID: response => response.server.id
}) {}
