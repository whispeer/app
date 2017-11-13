import * as Bluebird from "bluebird";

import CacheService from './Cache';

import { errorServiceInstance } from "./error.service";
import sessionService from "./session.service";

const initService = require("services/initService");

import trustManager from "../crypto/trustManager"
import userService from "../users/userService"
const signatureCache = require("crypto/signatureCache");

const debug = require("debug");

const STORESIGNATURECACHEINTERVAL = 30000;

const debugName = "whispeer:trustService";
const trustServiceDebug = debug(debugName);

function time(name: string) {
	if (debug.enabled(debugName)) {
		console.time(name);
	}
}

function timeEnd(name: string) {
	if (debug.enabled(debugName)) {
		console.timeEnd(name);
	}
}

const signatureCacheObject = new CacheService("signatureCache");

class TrustService {
	private loadCachePromise = Bluebird.resolve();

	constructor() {
		window.setInterval(this.storeSignatureCache, STORESIGNATURECACHEINTERVAL);

		initService.get("trustManager.get", this.onInit, {
			cacheCallback: this.loadFromCache
		});

		this.waitForLogin();
	}

	private waitForLogin() {
		sessionService.awaitLogin().then(() => {
			time("getSignatureCache");
			return signatureCacheObject.get(sessionService.getUserID().toString()).catch(function () {
				return;
			});
		}).then((signatureCacheData: any) => {
			timeEnd("getSignatureCache");

			if (signatureCacheData) {
				signatureCache.load(signatureCacheData.data);
			} else {
				signatureCache.initialize();
			}
		});
	}

	private onInit = (data: any) => {
		trustServiceDebug("trustManager.get finished unchanged: " + data.unChanged);
		return this.loadCachePromise.catch(function (e: any) {
			trustServiceDebug("Could not load trust service from cache!");
			console.error(e);
		}).then(() => userService.getOwnAsync()).then(() => {
			if (data.unChanged) {
				if (!trustManager.isLoaded()) {
					throw new Error("cache loading seems to have failed but server is unchanged!");
				}

				trustServiceDebug("trustManager unChanged");
				return;
			}

			trustServiceDebug("trustManager get loading");

			if (trustManager.isLoaded()) {
				trustServiceDebug("trustManager cache exists updating");

				return trustManager.updateDatabase(data.content).then(function () {
					return false;
				});
			}

			if (data.content) {
				trustServiceDebug("load content");
				return this.loadDatabase(data.content);
			}

			trustServiceDebug("create new trust database!");
			return this.createTrustDatabase();
		});
	}

	private storeSignatureCache = () => {
		if (signatureCache.isChanged()) {
			trustServiceDebug("Storing signature cache!");
			time("storedSignatureCache");

			signatureCache.resetChanged();

			signatureCache.getUpdatedVersion().then((updatedVersion: any) => {
				return signatureCacheObject.store(sessionService.getUserID().toString(), updatedVersion);
			}).then(function () {
				timeEnd("storedSignatureCache");
			});
		}
	}

	private loadDatabase = (database: any, cb?: Function) => {
		return trustManager.loadDatabase(database).thenReturn(database).nodeify(cb);
	}

	private createTrustDatabase = () => {
		userService.getOwnAsync().then((ownUser) => {
			const key = ownUser.getSignKey()
			const userid = ownUser.getID()
			const nickname = ownUser.getNickname()

			trustManager.createDatabase({ key, userid, nickname });

			trustManager.uploadDatabase().catch(errorServiceInstance.criticalError);

			return null;
		})
	}

	private loadFromCache = (cacheEntry: any) => {
		trustServiceDebug("trustManager cache get done");
		this.loadCachePromise = userService.getOwnAsync().then(() => {
			trustServiceDebug("trustManager cache loading");
			return this.loadDatabase(cacheEntry.data);
		});

		return this.loadCachePromise;
	}
}

export default new TrustService();
