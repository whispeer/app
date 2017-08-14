import errorService from "../services/error.service"
import socketService from "../services/socket.service"

import h from "../helper/helper"
import * as Bluebird from "bluebird"

const initService = require("services/initService")
import State from "../asset/state"
const SecuredData = require("asset/securedDataWithMetaData")
const keyStoreService = require("crypto/keyStore")

import sessionService from "../services/session.service"
import blobService from "../services/blobService"
import Profile from "../users/profile"
import trustService from "../services/trust.service"
import settingsService from "../services/settings.service"
import filterService from "../services/filter.service"

const friendsService = require("services/friendsService")

const advancedBranches = ["location", "birthday", "relationship", "education", "work", "gender", "languages"]

function applicableParts(scope, privacy, profile) {
	var result = {}

	if (privacy === undefined || profile === undefined) {
		throw new Error("dafuq")
	}

	h.objectEach(privacy, (key, val) => {
		if (profile[key]) {
			if (typeof val.encrypt !== "undefined") {
				if (!val.encrypt || val.visibility.indexOf(scope) > -1) {
					result[key] = profile[key]
				}
			} else {
				result[key] = applicableParts(scope, val, profile[key])
			}
		}
	})

	return result
}

function applicablePublicParts(privacy, profile) {
	var result = {}

	if (privacy === undefined || profile === undefined) {
		throw new Error("dafuq")
	}

	h.objectEach(privacy, (key, value) => {
		if (profile[key]) {
			if (typeof value.encrypt !== "undefined") {
				if (!value.encrypt) {
					result[key] = profile[key]
				}
			} else {
				result[key] = applicablePublicParts(value, profile[key])
			}
		}
	})

	return result
}

function getAllProfileTypes(privacySettings) {
	var profileTypes = []
	advancedBranches.forEach((branch) => {
		if (privacySettings[branch].encrypt) {
			profileTypes = profileTypes.concat(privacySettings[branch].visibility)
		}
	})

	if (privacySettings.basic.firstname.encrypt) {
		profileTypes = profileTypes.concat(privacySettings.basic.firstname.visibility)
	}

	if (privacySettings.basic.lastname.encrypt) {
		profileTypes = profileTypes.concat(privacySettings.basic.lastname.visibility)
	}

	return h.arrayUnique(profileTypes)
}

function deleteCache() {
	return Bluebird.try(() => {
		return new Bluebird((resolve) => {
			var deleteRequest = indexedDB.deleteDatabase("whispeerCache")

			deleteRequest.onerror = resolve
			deleteRequest.onsuccess = resolve
		})
	})
}

class User {
	private mainKey
	private signKey
	private cryptKey
	private friendShipKey
	private friendsKey
	private migrationState
	private signedKeys
	private signedOwnKeys

	private id
	private mail
	private nickname
	private publicProfile
	private privateProfiles = []
	private myProfile
	private mutualFriends

	private addFriendState = new State()
	private ignoreFriendState = new State()

	private loadBasicDataPromise

	data: any = {}

	constructor (providedData) {
		this.update(providedData)
	}

	update = (userData) => {
		if (this.id && h.parseDecimal(userData.id) !== h.parseDecimal(this.id)) {
			throw new Error("user update invalid")
		}

		this.mutualFriends = userData.mutualFriends

		this.id = h.parseDecimal(userData.id)
		this.mail = userData.mail
		this.nickname = userData.nickname

		var isMe = (this.id === sessionService.getUserID())

		this.migrationState = userData.migrationState || 0

		this.signedKeys = SecuredData.load(undefined, userData.signedKeys, { type: "signedKeys" })
		this.signedOwnKeys = userData.signedOwnKeys

		if (!this.mainKey && userData.mainKey) {
			this.mainKey = userData.mainKey
		}

		//all keys we get from the signedKeys object:
		this.signKey = this.signedKeys.metaAttr("sign")
		this.cryptKey = this.signedKeys.metaAttr("crypt")

		if (isMe) {
			this.friendsKey = this.signedKeys.metaAttr("friends")
		}

		if (!isMe) {
			friendsService.awaitLoading().then(() => {
				if (friendsService.didOtherRequest(this.id)) {
					this.friendsKey = this.signedKeys.metaAttr("friends")
				}

				if (friendsService.didIRequest(this.id)) {
					this.friendShipKey = friendsService.getUserFriendShipKey(this.id)
				}
			})
		}

		if (!isMe) {
			if (userData.profile.pub) {
				userData.profile.pub.profileid = userData.profile.pub.profileid || this.id
				this.publicProfile = new Profile(userData.profile.pub, { isPublicProfile: true })
			}

			this.privateProfiles = []

			if (userData.profile.priv && userData.profile.priv instanceof Array) {
				var priv = userData.profile.priv

				this.privateProfiles = priv.map((profile) => {
					return new Profile(profile)
				})
			}
		} else {
			this.myProfile = new Profile(userData.profile.me)
		}

		this.data = {
			notExisting: false,
			user: this,
			id: this.id,
			trustLevel: 0,
			fingerprint: keyStoreService.format.fingerPrint(this.signKey),
			basic: {
				age: "?",
				location: "?",
				mutualFriends: this.mutualFriends,
				url: "user/" + this.nickname,
				image: "assets/img/user.png"
			},
			advanced: {
				birthday:	{
					day:	"",
					month: "",
					year:	""
				},
				location: {
					town:	"",
					state: "",
					country: ""
				},
				partner:	{
					type:	"",
					name: ""
				},
				education: [],
				job: {
					what: "",
					where: ""
				},
				gender: {
					gender: "none",
					text: ""
				},
				languages: []
			}
		}
	}

	// updateUser(providedData)

	generateNewFriendsKey = () => {
		var newFriendsKey
		return Bluebird.try(() => {
			if (!this.isOwn()) {
				throw new Error("not my own user")
			}

			//generate new key
			return keyStoreService.sym.generateKey(null, "friends")
		}).then((_newFriendsKey) => {
			newFriendsKey = _newFriendsKey

			//encrypt with all friendShipKeys
			var keys = friendsService.getAllFriendShipKeys()

			var keysPromises = keys.map((key) => {
				return keyStoreService.sym.symEncryptKey(newFriendsKey, key)
			})

			return Bluebird.all([
				Bluebird.all(keysPromises),
				keyStoreService.sym.symEncryptKey(newFriendsKey, this.mainKey),

				//encrypt old friends key with new friends key
				keyStoreService.sym.symEncryptKey(this.friendsKey, newFriendsKey),
			])
		}).then(() => {
			//update signedKeys
			this.signedKeys.metaSetAttr("friends", newFriendsKey)
			return this.signedKeys.getUpdatedData(this.signKey)
		}).then((updatedSignedKeys) => {
			this.friendsKey = newFriendsKey
			return {
				updatedSignedKeys: updatedSignedKeys,
				newFriendsKey: newFriendsKey
			}
		})
	}

	setFriendShipKey = (key) => {
		if (!this.friendShipKey) {
			this.friendShipKey = key
		}
	}

	/** profile management */

	// there is mainly one profile: the "me" profile, containing all data.
	// this profile is always updated when we edit the profile.
	// every other profile is a smaller part of this profile and is generated
	// after updating the "me" profile (or at other times - e.g. when settings change)

	/* gets a given profile attribute to value
	* @param attribute attribute to set
	* @param cb
	*/
	getProfileAttribute = (attribute) => {
		if (this.myProfile) {
			return this.myProfile.getAttribute(attribute)
		}

		var profiles = this.privateProfiles.concat([this.publicProfile])

		return Bluebird.resolve(profiles).map((profile: Profile) => {
			return profile.getAttribute(attribute)
		}).filter((value) => {
			return typeof value !== "undefined" && value !== ""
		}).then((values) => {
			if (values.length === 0) {
				return ""
			}

			values.sort((val1, val2) => {
				if (typeof val1 === "object" && typeof val2 === "object") {
					return Object.keys(val2).length - Object.keys(val1).length
				}

				return 0
			})

			return values[0]
		})
	}

	/** uses the me profile to generate new profiles */
	rebuildProfiles = () => {
		var scopes, privacySettings
		return Bluebird.try(() => {
			if (!this.isOwn()) {
				throw new Error("update on another user failed")
			}

			privacySettings = settingsService.getBranch("privacy")
			scopes = getAllProfileTypes(privacySettings)

			var filterToKeysPromise = filterService.filterToKeys(scopes)

			return Bluebird.all([
				filterToKeysPromise,
				this.myProfile.getFull()
			])
		}).spread((keys: any, profile: any) => {
			var scopeData = h.joinArraysToObject({
				name: scopes,
				key: keys.slice(0, keys.length - 1)
			})

			var pub = new Profile({ content: applicablePublicParts(privacySettings, profile) }, { isPublicProfile: true })
			var pubPromise = pub.sign(this.getSignKey())

			var privatePromises = scopeData.map((scope) => {
				var newProfile = new Profile({
					content: applicableParts(scope.name, privacySettings, profile)
				}, { isDecrypted: true })

				return newProfile.signAndEncrypt(this.getSignKey(), scope.key)
			})

			return Bluebird.all([
				pubPromise,
				Bluebird.all(privatePromises)
			])
		}).spread((pub, profileData) => {
			return {
				pub: pub,
				priv: profileData
			}
		})

	}

	setMail = (newMail, cb) => {
		if (newMail === this.mail) {
			return Bluebird.resolve().nodeify(cb)
		}

		return socketService.emit("user.mailChange", { mail: newMail }).then(() => {
			this.mail = newMail
		}).nodeify(cb)
	}

	/** uploads all profiles (also recreates them) */
	uploadChangedProfile = (cb) => {
		return Bluebird.try(() => {
			return Bluebird.all([
				this.rebuildProfiles(),
				this.myProfile.getUpdatedData(this.getSignKey())
			])
		}).spread((profileData, myProfile: any) => {
			profileData.me = myProfile

			return socketService.emit("user.profile.update", profileData)
		}).then(() => {
			this.myProfile.updated()

			this.loadBasicDataPromise = null
			return this.loadFullData()
		}).nodeify(cb)
	}

	/* sets a given profile attribute to value
	* @param attribute attribute to set
	* @param value value of the attribute
	* @param cb
	*/
	setProfileAttribute = (attribute, value) => {
		return this.myProfile.setAttribute(attribute, value)
	}

	removeProfileAttribute = (attribute, value) => {
		return this.myProfile.removeAttribute(attribute, value)
	}

	getFingerPrint = () => {
		return keyStoreService.format.fingerPrint(this.getSignKey())
	}

	setAdvancedProfile = (advancedProfile, cb) => {
		return Bluebird.resolve(advancedBranches).map((branch: string) => {
			return this.myProfile.setAttribute(branch, advancedProfile[branch])
		}).nodeify(cb)
	}

	/** end profile management */

	verifyOwnKeys = () => {
		keyStoreService.security.verifyWithPW(this.signedOwnKeys, {
			main: this.getMainKey(),
			sign: this.getSignKey()
		})

		keyStoreService.security.addEncryptionIdentifier(this.getMainKey())
		keyStoreService.security.addEncryptionIdentifier(this.getSignKey())
	}

	verifyKeys = () => {
		return Bluebird.try(() => {
			const signKey = this.getSignKey()
			return this.signedKeys.verifyAsync(this.signKey, this.getID())
		}).then(() => {
			var friends = this.signedKeys.metaAttr("friends")
			var crypt = this.signedKeys.metaAttr("crypt")

			keyStoreService.security.addEncryptionIdentifier(friends)
			keyStoreService.security.addEncryptionIdentifier(crypt)
		})
	}

	verify = () => {
		return Bluebird.try(() => {
			var promises = []

			promises.push(this.verifyKeys())

			if (this.isOwn()) {
				promises.push(this.myProfile.verify(this.signKey))
			} else {
				promises = promises.concat(this.privateProfiles.map((priv) => {
					return priv.verify(this.signKey)
				}))

				if (this.publicProfile) {
					promises.push(this.publicProfile.verify(this.signKey))
				}
			}

			return Bluebird.all(promises)
		})
	}

	verifyFingerPrint = (fingerPrint) => {
		return Bluebird.try(() => {
			if (fingerPrint !== keyStoreService.format.fingerPrint(this.getSignKey())) {
				throw new Error("wrong code")
			}

			return trustService.verifyUser(this)
		}).then(() => {
			this.data.trustLevel = 2
		})
	}

	createBackupKey = () => {
		var outerKey
		return Bluebird.try(() => {
			return initService.awaitLoading()
		}).then(() => {
			return keyStoreService.sym.createBackupKey(this.mainKey)
		}).then((backupKeyData) => {
			var decryptors = backupKeyData.decryptors
			var innerKey = backupKeyData.innerKey

			outerKey = backupKeyData.outerKey

			return socketService.emit("user.backupKey", {
				innerKey: innerKey,
				decryptors: decryptors
			})
		}).then((data) => {
			if (data.error) {
				throw new Error("server error")
			}

			return keyStoreService.format.base32(outerKey)
		})
	}

	getTrustLevel = () => {
		return this.getTrustData().then((trust) => {
			if (trust.isOwn()) {
				return -1
			}

			if (trust.isVerified()) {
				return 2
			}

			if (trust.isWhispeerVerified() || trust.isNetworkVerified()) {
				return 1
			}

			return 0
		})
	}

	getTrustData = () => {
		return Bluebird.resolve(
			trustService.getKey(this.getSignKey())
		)
	}

	changePassword = (newPassword, cb) => {
		return Bluebird.try(() => {
			if (!this.isOwn()) {
				throw new Error("not my own user")
			}

			var ownKeys = {main: this.mainKey, sign: this.signKey}

			return Bluebird.all([
				keyStoreService.security.makePWVerifiable(ownKeys, newPassword),
				keyStoreService.random.hex(16),

				keyStoreService.sym.pwEncryptKey(this.mainKey, newPassword),

				deleteCache(),
			])
		}).spread((signedOwnKeys, salt, decryptor) => {
			return socketService.emit("user.changePassword", {
				signedOwnKeys: signedOwnKeys,
				password: {
					salt: salt,
					hash: keyStoreService.hash.hashPW(newPassword, salt),
				},
				decryptor: decryptor
			})
		}).then(() => {
			sessionService.setPassword(newPassword)
		}).nodeify(cb)
	}

	loadFullData = () => {
		return Bluebird.try(() => {
			return this.loadBasicData().thenReturn(advancedBranches)
		}).map((branch) => {
			return this.getProfileAttribute(branch)
		}).then((result) => {
			var i, advanced = this.data.advanced, defaults = [{}, {}, {}, [], {}, {}, []]

			for (i = 0; i < advancedBranches.length; i += 1) {
				if (advancedBranches[i] === "gender" && typeof result[i] === "string") {
					result[i] = { gender: result[i] }
				}

				advanced[advancedBranches[i]] = h.deepCopyObj(result[i] || defaults[i], 3)
			}
		})
	}

	getFriends = (cb) => {
		return friendsService.getUserFriends(this.getID(), cb)
	}

	loadImage = () => {
		return this.getImage().then((imageUrl) => {
			this.data.basic.image = imageUrl
		}).catch((e) => errorService.criticalError(e))
	}

	loadBasicData = () => {
		if (!this.loadBasicDataPromise) {
			this.loadBasicDataPromise = Bluebird.try(() => {
				return Bluebird.all([
					this.getShortName(),
					this.getName(),
					this.getTrustLevel(),
					this.verify()
				])
			}).spread((shortname, names: any, trustLevel, signatureValid) => {
				this.data.signatureValid = signatureValid

				this.data.me = this.isOwn()
				this.data.other = !this.isOwn()

				this.data.trustLevel = trustLevel

				this.data.online = friendsService.onlineStatus(this.getID()) || 0

				friendsService.listen((status) => {
					this.data.online = status
				}, "online:" + this.getID())

				this.data.name = names.name
				this.data.names = names

				this.data.basic.shortname = shortname

				friendsService.awaitLoading().then(() => {
					this.data.added = friendsService.didIRequest(this.getID())
					this.data.isMyFriend = friendsService.areFriends(this.getID())

					friendsService.listen(() => {
						this.data.added = friendsService.didIRequest(this.getID())
						this.data.isMyFriend = friendsService.areFriends(this.getID())
					})
				})

				this.data.addFriendState = this.addFriendState.data
				this.data.ignoreFriendState = this.ignoreFriendState.data

				this.loadImage()

				return null
			})
		}

		return this.loadBasicDataPromise
	}

	setMigrationState = (migrationState, cb) => {
		return socketService.emit("user.setMigrationState", {
				migrationState: migrationState
		}).nodeify(cb)
	}

	getMigrationState = () => {
		return Bluebird.resolve(this.migrationState)
	}

	isOwn = () => {
		return this.getID() === sessionService.getUserID()
	}

	getNickOrMail = () => {
		return this.nickname || this.mail
	}

	getMainKey = () => {
		return this.mainKey
	}

	getSignKey = () => {
		return this.signKey
	}

	getCryptKey = () => {
		return this.cryptKey
	}

	getFriendShipKey = () => {
		return this.friendShipKey
	}

	getContactKey = () => {
		return this.friendShipKey || this.cryptKey
	}

	getFriendsKey = () => {
		return this.friendsKey
	}

	getID = () => {
		return parseInt(this.id, 10)
	}

	getNickname = () => {
		return this.nickname
	}

	getMail = () => {
		return this.mail
	}

	getImage = () => {
		return Bluebird.try(() => {
			return this.getProfileAttribute("imageBlob")
		}).then(blob => blob ?
			blobService.getBlobUrl(blob.blobid) : "assets/img/user.png"
		).then(url => window.device && window.device.platform === "iOS" ?
			url.replace("file://", "") : url
		)
	}

	getShortName = () => {
		return this.getProfileAttribute("basic").then((basic) => {
			basic = basic || {}
			var nickname = this.getNickname()

			return basic.firstname || basic.lastname || this.nickname || ""
		})
	}

	getName = () => {
		return this.getProfileAttribute("basic").then((basic) => {
			basic = basic || {}
			var nickname = this.getNickname()

			var searchNames = [this.nickname]

			var name = ""
			if (basic.firstname && basic.lastname) {
				name = basic.firstname + " " + basic.lastname
			} else if (basic.firstname || basic.lastname) {
				name = basic.firstname || basic.lastname
			} else if (this.nickname) {
				name = this.nickname
			}

			if (basic.firstname) {
				searchNames.push(basic.firstname)
			}

			if (basic.lastname) {
				searchNames.push(basic.lastname)
			}

			return {
				name: name,
				searchName: searchNames.join(" "),
				firstname: basic.firstname || "",
				lastname: basic.lastname || "",
				nickname: this.nickname || ""
			}
		})
	}

	ignoreFriendShip = () => {
		this.ignoreFriendState.pending()
		if (!this.isOwn()) {
			friendsService.ignoreFriendShip(this.getID(), errorService.failOnError(this.ignoreFriendState))
		} else {
			this.ignoreFriendState.failed()
		}
	}

	acceptFriendShip = () => {
		this.addFriendState.pending()
		if (!this.isOwn()) {
			friendsService.acceptFriendShip(this.getID(), errorService.failOnError(this.addFriendState))
		} else {
			this.addFriendState.failed()
		}
	}

	isNotExistingUser = () => {
		return false
	}

	removeAsFriend = () => {
		if (!this.isOwn()) {
			friendsService.removeFriend(this.getID(), errorService.criticalError)
		} else {
			this.addFriendState.failed()
		}
	}

	addAsFriend = () => {
		this.addFriendState.pending()
		if (!this.isOwn()) {
			friendsService.friendship(this.getID(), errorService.failOnError(this.addFriendState))
		} else {
			this.addFriendState.failed()
		}
	}
}

export default User
