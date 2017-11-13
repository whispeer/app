"use strict";

import Observer from "asset/observer"
import SecuredDataApi, { SecuredData } from "../asset/securedDataWithMetaData"
import Enum from "../asset/enum"
const errors = require("asset/errors");
import * as Bluebird from "bluebird"

interface keyMap { [x: string]: string }

const SECURED_OPTIONS = {
	type: "trustManager"
}

interface trustEntry {
	added: number,
	trust: string,
	key: string,
	userid: string,
	nickname: string
}

interface legacyTrustSet {
	nicknames: keyMap
	ids: keyMap
	me: string
	[x: string]: any
}

interface trustSet {
	keys: { [x: string]: trustEntry }
	nicknames: keyMap
	ids: keyMap
	me: string
}

const transformLegacy = ({ nicknames, ids, me, ...rest }: legacyTrustSet) : trustSet => {
	const keys : { [x: string]: trustEntry } = {}

	Object.keys(rest).filter((key) => key.indexOf("_") === -1).forEach((key) => {
		keys[key] = rest[key]
	})

	return {
		nicknames,
		ids,
		me,
		keys
	}
}

class TrustStore {
	private nicknames: { [x: string]: string }
	private ids: { [x: string]: string }
	private me: string
	private keys: { [x: string]: trustEntry }

	constructor({ nicknames, ids, me, keys } : trustSet) {
		this.nicknames = nicknames
		this.ids = ids
		this.me = me
		this.keys = keys
	}

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

		const secured = new SecuredData(null, info, SECURED_OPTIONS, true)
		return secured.sign(ownKey)
	}

	hasKeyData = (key) => this.keys.hasOwnProperty(key)
}

let trustStore : TrustStore
let loaded = false
let fakeKeyExistence = 0
let ownKey: string


const sortedTrustStatesNames = ["BROKEN", "UNTRUSTED", "TIMETRUSTED", "WHISPEERVERIFIED", "NETWORKVERIFIED", "VERIFIED", "OWN"];

const trustStates = new Enum(sortedTrustStatesNames);

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

function userToDataSet({ key, userid, nickname }, trustLevel = trustStates.UNTRUSTED) : trustEntry {
	return {
		added: new Date().getTime(),
		trust: serializeTrust(trustLevel),
		key,
		userid,
		nickname
	}
}

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
	trustStates: trustStates,
	isLoaded: function() {
		return loaded;
	},
	createDatabase: function({ key, userid, nickname } : { key: string, userid: number, nickname: string }) {
		trustStore = new TrustStore({
			nicknames: {
				[nickname]: key
			},
			ids: {
				[userid]: key
			},
			me: key,
			keys: {
				[key]: userToDataSet({ key, userid, nickname }, trustStates.OWN)
			}
		})

		loaded = true;
	},
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

		var givenDatabase = SecuredDataApi.load(undefined, data, SECURED_OPTIONS);

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
	loadDatabase: function(data) {
		if (loaded) {
			return;
		}

		if (data.me !== ownKey) {
			throw new errors.SecurityError("not my trust database");
		}

		var givenDatabase = SecuredDataApi.load(undefined, data, SECURED_OPTIONS);
		return Bluebird.try(function() {
			return givenDatabase.verifyAsync(ownKey, "user");
		}).then(function() {
			trustManager.disallow();

			trustStore = new TrustStore(transformLegacy(givenDatabase.metaGet()));
			loaded = true;

			trustManager.notify("", "loaded");
		})
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
	getUpdatedVersion: function() {
		if (!loaded) {
			throw new Error("trust manager not yet loaded can not get updated version")
		}
		return trustStore.getUpdatedVersion()
	}
};

Observer.extend(trustManager);

export default trustManager;
