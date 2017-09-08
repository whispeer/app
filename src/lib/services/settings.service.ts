import * as Bluebird from "bluebird";
import socketService from "./socket.service";
import * as keyStore from "../crypto/keyStore.js";

import Observer from "../asset/observer";

const initService = require("services/initService");

interface IVisibility {
	encrypt: boolean,
	visibility: string[]
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

const publicBranches = ["uiLanguage", "sound", "donate"]
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

class SettingsService extends Observer {

	settings: any;
	serverSettings = {};
	api: any;

	loadCachePromise = Bluebird.resolve();

	private migrateToFormat2 = (givenOldSettings: any) => {
		console.warn("migrating settings to format 2");

		return Bluebird.try(() => {
			keyStore.security.allowPrivateActions();
			var oldSettings = new EncryptedData(givenOldSettings);
			return oldSettings.decrypt();
		}).then(decryptedSettings => {
			var data = turnOldSettingsToNew(decryptedSettings);

			data.meta.initialLanguage = h.getLanguageFromPath();

			var ownUser = require("users/userService").default.getOwn();

			return SecuredData.createAsync(data.content,
				data.meta,
				securedDataOptions,
				ownUser.getSignKey(),
				ownUser.getMainKey()
			)

		}).then(signedAndEncryptedSettings => {
			this.settings = SecuredData.load(
				signedAndEncryptedSettings.content,
				signedAndEncryptedSettings.meta,
				securedDataOptions
			)

			return socketService.emit("settings.setSettings", {
				settings: signedAndEncryptedSettings,
			}).thenReturn(this.settings);
		})
	}

	loadSettings = (givenSettings: any) => {
		this.serverSettings = givenSettings.server || {};

		return Bluebird.try(() => {
			if (givenSettings.ct) {
				return this.migrateToFormat2(givenSettings);
			} else {
				return SecuredData.load(givenSettings.content, givenSettings.meta, securedDataOptions);
			}
		}).then(_settings => {
			this.settings = _settings;

			var decryptAsync = Bluebird.promisify(this.decrypt.bind(this));

			return decryptAsync();
		}).then(() => {
			this.notify("", "loaded");
		});
	}

	loadFromCache = (cacheEntry: any) => {
		var userService = require("users/userService").default;

		this.loadCachePromise = userService.getOwnAsync().then(() => {
			return this.loadSettings(cacheEntry.data);
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
				return this.loadSettings(givenSettings);
			}).thenReturn(toCache);
		});
	}

	constructor() {
		super();

		initService.get("settings.get", this.loadFromServer, {
			cacheCallback: this.loadFromCache,
			cache: true
		});
	}

	setDefaultLanguage = (language: string) => defaultSettings.uiLanguage = language

	getContent = () => this.settings.contentGet()

	setContent = (content: any) => this.settings.contentSet(content)

	decrypt = (cb: Function) => {
		return Bluebird.try(() => {
			var ownUser = require("users/userService").default.getOwn();

			return Bluebird.all([
				this.settings.decrypt(),
				this.settings.verify(ownUser.getSignKey(), null, "settings")
			]);
		}).nodeify(cb);
	};

	getBranch = (branchName: any) => {
		var branchContent: any;

		if (isBranchServer(branchName)) {
			branchContent = this.serverSettings[branchName];
		} else if (isBranchPublic(branchName)) {
			branchContent = this.settings.metaAttr(branchName);
		} else {
			branchContent = this.settings.contentGet()[branchName];
		}

		if (typeof branchContent === "undefined") {
			return defaultSettings[branchName];
		}

		return branchContent;
	};

	updateBranch = (branchName: any, value: any) => {
		if (isBranchServer(branchName)) {
			this.serverSettings[branchName] = value;
		} else if (isBranchPublic(branchName)) {
			this.settings.metaSetAttr(branchName, value);
		} else {
			this.settings.contentSetAttr(branchName, value);
		}
	};


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
		if (!this.settings.isChanged()) {
			return Bluebird.resolve(true)
		}

		var userService = require("users/userService").default;

		return this.settings.getUpdatedData(
				userService.getOwn().getSignKey()
			).then((newEncryptedSettings: any) => {
				newEncryptedSettings.server = this.serverSettings;

				return socketService.emit("settings.setSettings", {
					settings: newEncryptedSettings
				});
			}).then((result: any) =>
				result.success
			)
	};

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
