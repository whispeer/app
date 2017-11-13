"use strict";

import h from "../helper/helper";
import socketService from "../services/socket.service";
import Observer from "../asset/observer"
import SecuredDataApi, { SecuredData } from "../asset/securedDataWithMetaData"
import Enum from "../asset/enum"
const errors = require("asset/errors");
import * as Bluebird from "bluebird"
import errorService from "../services/error.service";
import sessionService from "../services/session.service";

import CacheService from '../services/Cache';

const initService = require("services/initService");

const THROTTLE = 50
const trustManagerCache = new CacheService("trustManager.get");

interface keyMap { [x: string]: string }

export const TRUST_SECURED_OPTIONS = {
	type: "trustManager"
}

export interface trustEntry {
	added: number,
	trust: string,
	key: string,
	userid: string,
	nickname: string
}

export interface legacyTrustSet {
	nicknames: keyMap
	ids: keyMap
	me: string
	[x: string]: any
}

export interface trustSet {
	keys: { [x: string]: trustEntry }
	nicknames: keyMap
	ids: keyMap
	me: string
	signature: string
}

export class TrustStore {
	private nicknames: { [x: string]: string }
	private ids: { [x: string]: string }
	private me: string
	private keys: { [x: string]: trustEntry }
	private signature: string

	constructor({ nicknames, ids, me, keys, signature } : trustSet) {
		this.nicknames = nicknames
		this.ids = ids
		this.me = me
		this.keys = keys
		this.signature = signature
	}

	getSignature = () => this.signature

	update = ({ nicknames, ids, me, keys } : trustSet) => {
		const newKeys = Object.keys(keys)
			.filter((key) => !this.keys.hasOwnProperty(key))

		const trustIncreasedKeys = Object.keys(keys)
			.filter((key) => this.keys.hasOwnProperty(key))
			.filter((key) => {
				const oldTrust = unserializeTrust(this.keys[key].trust);
				const newTrust = unserializeTrust(keys[key].trust);

				return sortedTrustStates.indexOf(oldTrust) < sortedTrustStates.indexOf(newTrust)
			})

		newKeys
			.forEach((signKey) => this.add(keys[signKey]) )

		trustIncreasedKeys
			.forEach((key) => this.keys[key].trust = keys[key].trust)

		return newKeys.length > 0 || trustIncreasedKeys.length > 0
	}

	add = (dataSet: trustEntry) => {
		const { key, userid, nickname } = dataSet

		const idKey = this.ids[userid]
		const nicknameKey = this.nicknames[nickname]

		if (idKey && idKey !== key) {
			throw new errors.SecurityError("we already have got a key for this users id");
		}

		if (nicknameKey && nicknameKey !== key) {
			throw new errors.SecurityError("we already have got a key for this users nickname");
		}

		this.keys[key] = dataSet

		if (nickname) {
			this.nicknames[nickname] = key
		}

		this.ids[userid] = key
	}

	get = (key: string) => this.keys[key]

	setKeyTrustLevel = (key: string, trustLevel) => {
		this.keys[key].trust = trustLevel
	}

	getUpdatedVersion = () => {
		const info = {
			nicknames: this.nicknames,
			ids: this.ids,
			me: this.me
		}

		Object.keys(this.keys).forEach((key) => {
			info[key] = this.keys[key]
		})

		const secured = new SecuredData(null, info, TRUST_SECURED_OPTIONS, true)
		return secured.sign(ownKey)
	}

	getTrustSet = () : trustSet => ({
		nicknames: this.nicknames,
		keys: this.keys,
		ids: this.ids,
		me: this.me,
		signature: this.signature
	})

	hasKeyData = (key) => this.keys.hasOwnProperty(key)
}

let trustStore : TrustStore
let loaded = false
let fakeKeyExistence = 0
let ownKey: string


const sortedTrustStatesNames = ["BROKEN", "UNTRUSTED", "TIMETRUSTED", "WHISPEERVERIFIED", "NETWORKVERIFIED", "VERIFIED", "OWN"];

export const trustStates = new Enum(sortedTrustStatesNames);

const sortedTrustStates = sortedTrustStatesNames.map(function(trustLevel) {
	return trustStates.fromString("|" + trustLevel + "|");
});

function serializeTrust(trustLevel) {
	return trustStates.toString(trustLevel);
}

function unserializeTrust(trustLevel) {
	return trustStates.fromString(trustLevel);
}

class KeyTrustData {
	private trustSymbol

	constructor (private data: trustEntry) {
		this.trustSymbol = unserializeTrust(data.trust);
	}

	getAddedTime = () => this.data.added
	getKey = () => this.data.key
	getUserID = () => this.data.userid
	getNickname = () => this.data.nickname
	getTrust = () => this.trustSymbol

	isUntrusted = () => this.trustSymbol === trustStates.UNTRUSTED
	isTimeTrusted = () => this.trustSymbol === trustStates.TIMETRUSTED
	isWhispeerVerified = () => this.trustSymbol === trustStates.WHISPEERVERIFIED
	isNetworkVerified = () => this.trustSymbol === trustStates.NETWORKVERIFIED
	isVerified = () => this.trustSymbol === trustStates.VERIFIED
	isOwn = () => this.trustSymbol === trustStates.OWN
}

export function userToDataSet({ key, userid, nickname }, trustLevel = trustStates.UNTRUSTED) : trustEntry {
	return {
		added: new Date().getTime(),
		trust: serializeTrust(trustLevel),
		key,
		userid,
		nickname
	}
}

const uploadDatabase = () =>
	initService.awaitLoading()
		.then(() => trustStore.getUpdatedVersion())
		.then((newTrustContent: any) => {
			trustManagerCache.store(sessionService.getUserID().toString(), newTrustContent);

			return socketService.emit("trustManager.set", {
				content: newTrustContent
			});
		})
		.then((response: any) => !response.success ? errorService.criticalError(response) : null)

const scheduleTrustmanagerUpload = h.aggregateOnce(THROTTLE, uploadDatabase);

const trustManager = {
	notify: <any> null,
	listen: <any> null,
	allow: function(count) {
		if (!loaded) {
			fakeKeyExistence = count;
		}
	},
	disallow: function() {
		fakeKeyExistence = 0;
	},
	trustStates,
	isLoaded: () => loaded,
	setOwnSignKey: function(_ownKey) {
		ownKey = _ownKey;
	},
	addDataSet: function(dataSet) {
		trustStore.add(dataSet)
	},
	updateDatabase: function(data, cb?) {
		if (!loaded) {
			throw new Error("cant update database: not loaded")
		}

		var givenDatabase = SecuredDataApi.load(undefined, data, TRUST_SECURED_OPTIONS);

		return Bluebird.try(function() {
			if (data.me === ownKey) {
				return givenDatabase.verifyAsync(ownKey, "user");
			}

			throw new errors.SecurityError("not my trust database");
		}).then(function() {
			const changed = trustStore.update(givenDatabase.metaGet())

			if (changed) {
				trustManager.notify("", "updated");
			}

			return changed;
		}).nodeify(cb);
	},
	hasKeyData: function(keyid) {
		if (!loaded) {
			if (keyid === ownKey) {
				return true;
			} else if (fakeKeyExistence > 0) {
				fakeKeyExistence -= 1;
				return true;
			} else {
				throw new Error("trust manager not yet loaded");
			}
		}
		return trustStore.hasKeyData(keyid)
	},
	getKeyData: function(keyid) {
		const keyData = trustStore.get(keyid)

		if (keyData) {
			return new KeyTrustData(keyData);
		}

		throw new Error(`key not in trust database ${keyid}`)
	},
	addUser: function(userInfo) {
		trustManager.addDataSet(userToDataSet(userInfo));
	},
	setKeyTrustLevel: function(signKey, trustLevel) {
		if (trustLevel === trustStates.OWN) {
			throw new Error("do not use setKeyTrustLevel for own keys.");
		}

		if (trustStore.hasKeyData(signKey)) {
			trustStore.setKeyTrustLevel(signKey, serializeTrust(trustLevel))

			return true;
		}

		return false;
	},
	uploadDatabase,
	verifyUser: (user: any) => {
		trustManager.setKeyTrustLevel(user.getSignKey(), trustManager.trustStates.VERIFIED)
		return uploadDatabase()
	},
	addNewUsers: (userInfo) => {
		if (trustManager.isLoaded() && !trustManager.hasKeyData(userInfo.key)) {
			trustManager.addUser(userInfo);
			scheduleTrustmanagerUpload()
		}
	},

	setTrustStore: (givenTrustStore: TrustStore) => {
		if (trustStore) {
			throw new Error("trying to overwrite trust store. Please update instance")
		}

		trustStore = givenTrustStore
		loaded = true
		trustManager.notify("", "loaded")
	}
};

Observer.extend(trustManager);

socketService.channel("notify.trustManager", (_e: any, data: any) => {
	trustManager.updateDatabase(data).catch(errorService.criticalError)
})

export default trustManager;
