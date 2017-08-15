import h from "../helper/helper"
import Observer from "../asset/observer"
import * as Bluebird from "bluebird"
import socketService from "../services/socket.service"
import CacheService from "../services/Cache"
import sessionService from "../services/session.service"
import errorService from "../services/error.service"

const signatureCache = require("crypto/signatureCache")
const trustManager = require("crypto/trustManager")

const sjcl = require("sjcl")
const keyStoreService = require("crypto/keyStore")
const initService = require("services/initService")

let userService, knownIDs = [], users = {}, ownUserStatus: any = {}

const Profile = require("../users/profile").default

const promises = ["verifyOwnKeysDone", "verifyOwnKeysCacheDone", "loadedCache", "loaded"]

promises.forEach(function (promiseName) {
	ownUserStatus[promiseName] = new Bluebird(function (resolve) {
		ownUserStatus[promiseName + "Resolve"] = function () {
			delete ownUserStatus[promiseName + "Resolve"]
			resolve()
		}
	})
})

const deletedUserName = "Deleted user"; //localize("user.deleted", {})
const NotExistingUser = function (identifier?) {
	this.data = {
		trustLevel: -1,
		notExisting: true,
		basic: {
			shortname: deletedUserName,
			image: "assets/img/user.png"
		},
		name: deletedUserName,
		user: this
	}

	if (typeof identifier === "number") {
		this.data.id = identifier
	}

	this.isNotExistingUser = function () {
		return true
	}

	this.loadBasicData = function (cb) {
		return Bluebird.resolve().nodeify(cb)
	}

	this.reLoadBasicData = function (cb) {
		return Bluebird.resolve().nodeify(cb)
	}

	this.loadFullData = function (cb) {
		return Bluebird.resolve().nodeify(cb)
	}

	this.isOwn = function () {
		return false
	}
}

const getProfiles = (userData, isMe) => {
	const profiles = {
		public: null,
		private: null,
		me: null
	}

	if (!isMe) {
		if (userData.profile.pub) {
			userData.profile.pub.profileid = userData.profile.pub.profileid || userData.id
			profiles.public = new Profile(userData.profile.pub, { isPublicProfile: true })
		}

		profiles.private = []

		if (userData.profile.priv && userData.profile.priv instanceof Array) {
			const priv = userData.profile.priv

			profiles.private = priv.map((profile) => {
				return new Profile(profile)
			})
		}
	} else {
		profiles.me = new Profile(userData.profile.me)
	}

	return profiles
}

function enhanceOwnUser(user) {
	const identifier = user.getNickOrMail()

	keyStoreService.setKeyGenIdentifier(identifier)
	improvementListener(identifier)
	keyStoreService.sym.registerMainKey(user.getMainKey())

	verifyOwnKeys(user)

	ownUserStatus.verifyOwnKeysDoneResolve()
	ownUserStatus.verifyOwnKeysCacheDoneResolve()

	trustManager.setOwnSignKey(user.getSignKey())
}

function makeUser(data) {
	return Bluebird.try(async function () {
		if (data.userNotExisting) {
			return new NotExistingUser(data.identifier)
		}

		if (data.error === true) {
			return new NotExistingUser()
		}

		// decrypt / verify profiles
		// verify signed keys
		const userID = h.parseDecimal(data.id)

		if (users[userID]) {
			return users[userID]
		}

		const isMe = sessionService.isOwnUserID(userID)

		// enhance own user

		const profiles = await getProfiles(data, isMe)

		// const meProfile = ProfileLoader.load(data.profile.me)

		const User = require("users/user").default
		const user = new User(data, profiles)
		const mail = user.getMail()
		const nickname = user.getNickname()

		knownIDs.push(userID)

		users[userID] = user

		if (mail) {
			users[mail] = user
		}

		if (nickname) {
			users[nickname] = user
		}

		userService.notify(user, "loadedUser")

		if (isMe) {
			enhanceOwnUser(user)
			await signatureCache.awaitLoading()
		}
		await verify(user)
		return user
	})
}

const THROTTLE = 20

/** loads all the users in the batch */
function doLoad(identifier) {
	return initService.awaitLoading().then(function () {
		return socketService.emit("user.getMultiple", {identifiers: identifier})
	}).then(function (data) {
		if (!data || !data.users) {
			return []
		}
		return data.users
	}).map(makeUser)
}

const delay = h.delayMultiplePromise(Bluebird, THROTTLE, doLoad, 10)

function loadUser(identifier) {
	return Bluebird.try(function () {
		if (users[identifier]) {
			return users[identifier]
		} else {
			return delay(identifier)
		}
	})
}

userService = {
	/** search your friends */
	queryFriends: function (query, cb) {
		return Bluebird.try(function () {
			return socketService.emit("user.searchFriends", {
				text: query,
				known: knownIDs
			})
		}).then((data) => {
			return data.results
		}).map((user: any) => {
			if (typeof user === "object") {
				return makeUser(user)
			} else {
				return users[user]
			}
		}).nodeify(cb)
	},

	/** search for a user
	* @param query query string to search for
	* @param cb user objects
	*/
	query: function (query, cb) {
		return initService.awaitLoading().then(function () {
			return socketService.definitlyEmit("user.search", {
				text: query,
				known: knownIDs
			})
		}).then((data) => {
			return data.results
		}).map((user) => {
			if (typeof user === "object") {
				return makeUser(user)
			} else {
				return users[user]
			}
		}).nodeify(cb)
	},

	/** load a user
	* @param identifier identifier of the user (id, nickname or mail)
	* @param cb called with results
	* this function is asynchronous and returns immediatly. requests are also batched.
	*/
	get: function (identifier, cb) {
		return loadUser(identifier).nodeify(cb)
	},

	/** load a user
	* @param identifiers identifier array of the users (id, nickname or mail)
	* @param cb called with results
	* this function is asynchronous and returns immediatly. requests are also batched.
	*/
	getMultiple: function getMultipleF(identifiers, cb) {
		return Bluebird.resolve(identifiers).map(function (id) {
			return loadUser(id)
		}).nodeify(cb)
	},

	/** gets multiple users and loads their basic data.
	* @param identifiers identifier of users to load
	* @param cb called with users data.
	*/
	getMultipleFormatted: function (identifiers, cb) {
		return Bluebird.try(function () {
			return userService.getMultiple(identifiers)
		}).map(function (user: any) {
			return user.loadBasicData().thenReturn(user)
		}).then(function (users) {
			return users.map(function (user) {
				return user.data
			})
		}).nodeify(cb)
	},

	verifyOwnKeysCacheDone: function () {
		return ownUserStatus.verifyOwnKeysCacheDone
	},

	verifyOwnKeysDone: function () {
		return ownUserStatus.verifyOwnKeysDone
	},

	ownLoadedCache: function () {
		return ownUserStatus.loadedCache
	},

	ownLoaded: function () {
		return ownUserStatus.loaded
	},

	/** get own user. synchronous */
	getOwn: function () {
		return users[sessionService.getUserID()]
	}
}

function improvementListener(identifier) {
	let improve = []

	keyStoreService.addImprovementListener(function (rid) {
		improve.push(rid)

		if (improve.length === 1) {
			Bluebird.resolve().timeout(5000).then(function () {
				const own = userService.getOwn()
				if (!own || own.getNickOrMail() !== identifier) {
					throw new Error("user changed so no improvement update!")
				}

				return Bluebird.all(improve.map(function (keyID) {
					return keyStoreService.sym.symEncryptKey(keyID, own.getMainKey())
				}))
			}).then(function () {
				const toUpload = keyStoreService.upload.getDecryptors(improve)
				return socketService.emit("key.addFasterDecryptors", {
					keys: toUpload
				})
			}).then(function () {
				improve = []
			}).catch(errorService.criticalError)
		}
	})
}

Observer.extend(userService)

function verifyOwnKeys(ownUser) {
	keyStoreService.security.verifyWithPW(ownUser.signedOwnKeys, {
		main: ownUser.getMainKey(),
		sign: ownUser.getSignKey()
	})

	keyStoreService.security.addEncryptionIdentifier(ownUser.getMainKey())
	keyStoreService.security.addEncryptionIdentifier(ownUser.getSignKey())
}

function verifyKeys(user) {
	return Bluebird.try(() => {
		user.getSignKey()
		return user.signedKeys.verifyAsync(user.signKey, user.getID())
	}).then(() => {
		const friends = user.signedKeys.metaAttr("friends")
		const crypt = user.signedKeys.metaAttr("crypt")

		keyStoreService.security.addEncryptionIdentifier(friends)
		keyStoreService.security.addEncryptionIdentifier(crypt)
	})
}

function verifyProfiles(user) {
	if (user.isOwn()) {
		return user.profiles.me.verify(user.signKey)
	}

	const promises = user.profiles.private.map((priv) => {
		return priv.verify(user.signKey)
	})

	if (user.profiles.public) {
		promises.push(user.profiles.public.verify(user.signKey))
	}

	return Bluebird.all(promises)
}

function verify(user) {
	return Bluebird.all([
		verifyKeys(user),
		verifyProfiles(user)
	])
}

function loadOwnUser(data) {
	return Bluebird.try(function () {
		return makeUser(data)
	}).catch(function (e) {
		if (e instanceof sjcl.exception.corrupt) {
			alert("Password did not match. Logging out")

			sessionService.logout()

			return new Bluebird(function () {})
		}

		return Bluebird.reject(e)
	})
}

const ownUserCache = new CacheService("ownUser")

initService.registerCacheCallback(function () {
	return ownUserCache.get(sessionService.getUserID().toString()).then(function (cacheEntry) {
		if (!cacheEntry) {
			throw new Error("No user Cache")
		}

		return loadOwnUser(cacheEntry.data)
	}).then(function () {
		ownUserStatus.loadedCacheResolve()
	})
})

initService.registerCallback(function () {
	return socketService.definitlyEmit("user.get", {
		id: sessionService.getUserID(),
		//TODO: use cachedInfo: getInfoFromCacheEntry(cachedInfo),
	}).then(function (data) {
		return loadOwnUser(data).thenReturn(data)
	}).then(function (userData) {
		ownUserCache.store(sessionService.getUserID().toString(), userData)

		ownUserStatus.loadedResolve()
		return null
	})
})

export default userService
