import ObjectLoader from "../services/cachedObjectLoader"
import * as Bluebird from "bluebird"

type SignedKeys = { }
type SignedKeysCache = { }

export class SignedKeysLoader extends ObjectLoader<SignedKeys, SignedKeysCache>({
	cacheName: "signedKeys",
	getID: (data) => {
		debugger; return ""
	},
	download: id => { throw new Error("profile get by id is not implemented") },
	load: ({ content, meta, isPublic, signKey }): Bluebird<SignedKeysCache> => {
		debugger
		return Bluebird.resolve({})
	},
	restore: (signedKeysCache: SignedKeysCache) => {
		return Bluebird.resolve({})
		// new Profile(profile, options)
	}
}) {}
