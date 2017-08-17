import ObjectLoader from "../services/cachedObjectLoader"
import * as Bluebird from "bluebird"

type SignedKeys = {
	crypt: string,
	friends: string,
	sign: string,
	_hashVersion: string,
	_signature: string,
	_type: string,
	_version: string,
}

type SignedKeysCache = {
	crypt: string,
	friends: string,
	sign: string,
	_hashVersion: string,
	_signature: string,
	_type: string,
	_version: string,
}

export class SignedKeysLoader extends ObjectLoader<SignedKeys, SignedKeysCache>({
	cacheName: "signedKeys",
	getID: ({ _signature }) => _signature,
	download: id => { throw new Error("profile get by id is not implemented") },
	load: ({ crypt, friends, sign, _hashVersion, _signature, _type, _version }): Bluebird<SignedKeysCache> => {



		// SecuredData.load(undefined, userData.signedKeys, { type: "signedKeys" })
		const tmp = {
			crypt: "abc",
			friends: "abc",
			sign: "abc",
			_hashVersion: "abc",
			_signature: "abc",
			_type: "abc",
			_version: "abc",
		}
		return Bluebird.resolve(tmp)
	},
	restore: (signedKeysCache: SignedKeysCache) => {
		return Bluebird.resolve(signedKeysCache)
		// new Profile(profile, options)
	}
}) {}
