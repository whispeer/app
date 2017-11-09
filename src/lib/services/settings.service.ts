import * as Bluebird from "bluebird";
import socketService from "./socket.service";
import * as keyStore from "../crypto/keyStore.js";

import Observer from "../asset/observer";

const initService = require("services/initService");

interface IVisibility {
	encrypt: boolean,
	visibility: string[]
}

interface blockedUserInfo {
	id: number,
	since: number
}

interface ISettings {
	privacy: {
		basic: {
			firstname: IVisibility,
			lastname: IVisibility
		},
		imageBlob: IVisibility,
		location: IVisibility,
		birthday: IVisibility,
		relationship: IVisibility,
		education: IVisibility,
		work: IVisibility,
		gender: IVisibility,
		languages: IVisibility
	},
	donate: {
		refused: boolean,
		later: number
	},
	sharePosts: string[],
	filterSelection: string[],
	sound: {
		enabled: boolean
	},
	messages: {
		sendShortCut: string
	},
	safety: {
		blockedUsers: blockedUserInfo[]
	},
	uiLanguage: string
}

import h from "../helper/helper";
const EncryptedData = require("crypto/encryptedData");
const SecuredData = require("asset/securedDataWithMetaData");

const notVisible:IVisibility = {
	encrypt: true,
	visibility: []
}

const privacyAttributes = ["birthday", "location", "relationship", "education", "work", "gender", "languages"]

const publicBranches = ["uiLanguage", "sound", "donate", "safety"]
const serverBranches = ["mailsEnabled"]

const defaultSettings:ISettings = {
	privacy: {
		basic: {
			firstname: {
				encrypt: false,
				visibility: ["always:allfriends"]
			},
			lastname: {
				encrypt: false,
				visibility: ["always:allfriends"]
			}
		},
		imageBlob: {
			encrypt: false,
			visibility: []
		},
		location: notVisible,
		birthday: notVisible,
		relationship: notVisible,
		education: notVisible,
		work: notVisible,
		gender: notVisible,
		languages: notVisible
	},
	donate: {
		refused: false,
		later: 0
	},
	sharePosts: ["always:allfriends"],
	filterSelection: [],
	sound: {
		enabled: true
	},
	messages: {
		sendShortCut: "enter"
	},
	safety: {
		blockedUsers: []
	},
	uiLanguage: "en"
}

const isBranchPublic = (branchName: string) => {
	return publicBranches.indexOf(branchName) > -1;
}

const isBranchServer = (branchName: string) => {
	return serverBranches.indexOf(branchName) > -1;
}

const securedDataOptions = { type: "settings", removeEmpty: true }

const turnOldSettingsToNew = (settings: any) => {
	var result = {
		meta: { initialLanguage: <string> undefined },
		content: { }
	};

	h.objectEach(settings, (key: any, val: any) => {
		if (isBranchPublic(key)) {
			result.meta[key] = val;
		} else {
			result.content[key] = val;
		}
	});

	return result;
}

const migrateToFormat2 = (givenOldSettings: any) => {
	console.warn("migrating settings to format 2");

	return Bluebird.try(() => {
		keyStore.security.allowPrivateActions();
		var oldSettings = new EncryptedData(givenOldSettings);
		return oldSettings.decrypt();
	}).then(decryptedSettings => {
		var { meta, content } = turnOldSettingsToNew(decryptedSettings);

		meta.initialLanguage = h.getLanguageFromPath();

		const ownUser = require("users/userService").default.getOwn()
		const transformedSettings = new Settings(content, meta)

		return transformedSettings.getUpdatedData(ownUser.getSignKey(), ownUser.getMainKey())
	}).then(signedAndEncryptedSettings => {
		const settings = SecuredData.load(
			signedAndEncryptedSettings.content,
			signedAndEncryptedSettings.meta,
			securedDataOptions
		)

		return socketService.emit("settings.setSettings", {
			settings: signedAndEncryptedSettings,
		}).thenReturn(settings);
	})
}

class Settings {
	private changed = false

	constructor (private content, private meta, private server = {}) {}

	getContent = () => this.content
	getMeta = () => this.meta
	getServer = () => this.server

	getBranch = (branchName) => {
		if (isBranchServer(branchName)) {
			return this.server[branchName];
		}

		if (isBranchPublic(branchName)) {
			return this.meta[branchName];
		}

		return this.content[branchName];
	}

	isChanged = () => this.changed

	setBranch = (branchName, value) => {
		if (isBranchServer(branchName)) {
			this.server[branchName] = value
		} else if (isBranchPublic(branchName)) {
			this.meta[branchName] = value
		} else {
			this.content[branchName] = value
		}

		this.changed = true
	}

	getUpdatedData = (signKey, encryptKey) =>
		SecuredData.createAsync(this.content, this.meta, securedDataOptions, signKey, encryptKey)
			.then((encryptedSettings) => {
				return {
					...encryptedSettings,
					server: this.server
				}
			})
}

let settings: Settings

const loadSettings = (givenSettings: any) => {
	return Bluebird.try(() =>
		givenSettings.ct ?
		migrateToFormat2(givenSettings) :
		SecuredData.load(givenSettings.content, givenSettings.meta, securedDataOptions)
	).then((secured) => {
		const ownUser = require("users/userService").default.getOwn()

		return Bluebird.all([
			secured.decrypt(),
			secured.verify(ownUser.getSignKey(), null, "settings")
		]).thenReturn(secured)
	}).then((secured) => {
		settings = new Settings(secured.contentGet(), secured.metaGet(), givenSettings.server)
	})
}

class SettingsService extends Observer {
	api: any;

	loadCachePromise = Bluebird.resolve();

	loadFromCache = (cacheEntry: any) => {
		var userService = require("users/userService").default;

		this.loadCachePromise = userService.getOwnAsync().then(() => {
			return loadSettings(cacheEntry.data);
		});

		return this.loadCachePromise;
	}

	loadFromServer = (data: any) => {
		return this.loadCachePromise.then(() => {
			if (data.unChanged) {
				return Bluebird.resolve();
			}

			var givenSettings = data.content;
			var toCache = h.deepCopyObj(givenSettings);

			var userService = require("users/userService").default;
			return userService.getOwnAsync().then(() => {
				return loadSettings(givenSettings);
			}).thenReturn(toCache);
		});
	}

	constructor() {
		super()

		initService.get("settings.get", this.loadFromServer, {
			cacheCallback: this.loadFromCache
		});
	}

	setDefaultLanguage = (language: string) => defaultSettings.uiLanguage = language

	getContent = () => settings.getContent()

	getBranchContent = (branchName: string) => settings.getBranch(branchName)

	getBranch = (branchName: string) => {
		if (!settings) {
			return defaultSettings[branchName];
		}

		const branchContent = this.getBranchContent(branchName)

		if (typeof branchContent === "undefined") {
			return defaultSettings[branchName];
		}

		return branchContent;
	};

	updateBranch = (branchName: string, value: any) => {
		settings.setBranch(branchName, value)
		this.notify("", "updated");
	}


	setPrivacy = (privacy: any) => {
		return Bluebird.try(() => {
			this.updateBranch("privacy", privacy);
			return this.uploadChangedData();
		}).then(() => {
			const userService = require("users/userService").default;
			return userService.getOwn().uploadChangedProfile();
		})
	}

	removeCircle = (id: any) => {
		return Bluebird.try(() => {
			var privacy = this.getBranch("privacy");

			privacyAttributes.forEach((safetyName: any) => {
				h.removeArray(privacy[safetyName].visibility, "circle:" + id);
			});

			h.removeArray(privacy.basic.firstname.visibility, "circle:" + id);
			h.removeArray(privacy.basic.lastname.visibility, "circle:" + id);

			return this.setPrivacy(privacy);
		})
	}

	uploadChangedData = () => {
		if (!settings.isChanged()) {
			return Bluebird.resolve(true)
		}

		const userService = require("users/userService").default;
		const ownUser = userService.getOwn()

		return settings.getUpdatedData(ownUser.getSignKey(), ownUser.getMainKey())
			.then((settings: any) => socketService.emit("settings.setSettings", { settings }))
			.then((result: any) => result.success)
	};

	getBlockedUsers = (): blockedUserInfo[] => this.getBranch("safety").blockedUsers

	setBlockedUsers = (blockedUsers: blockedUserInfo[]): Bluebird<any> => {
		const safety = this.getBranch("safety")

		this.updateBranch("safety", {
			...safety,
			blockedUsers
		})

		return this.uploadChangedData()
	}

	isBlockedSince = (userID: number, time: number) =>
		!!this.getBlockedUsers().find(({ id, since }) => userID === id && since < time )

	isBlocked = (userID: number) =>
		!!this.getBlockedUsers().find(({ id }) => userID === id)

	getPrivacyAttribute = (attr: any) => {
		var b = this.getBranch("privacy"),
				i: number,
				attrs = attr.split("."),
				cur = b;

		for (i = 0; i < attrs.length; i += 1) {
			if (cur[attrs[i]]) {
				if (typeof cur[attrs[i]].encrypt !== "undefined") {
					return cur[attrs[i]];
				}
				cur = cur[attrs[i]];
			}
		}

		throw new Error("could not find attribute settings");
	};

	getPrivacyEncryptionStatus = (attr: any) => {
		return this.getPrivacyAttribute(attr).encrypt;
	};

	getPrivacyVisibility = (attr: any) => {
		var privacyAttribute = this.getPrivacyAttribute(attr);

		if (privacyAttribute.encrypt) {
			return privacyAttribute.visibility;
		} else {
			return false;
		}
	}
};

export default new SettingsService();
