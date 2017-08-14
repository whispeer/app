import * as Bluebird from "bluebird"
import idb from "idb"

import Storage from "./Storage";
import blobCache from "../../lib/asset/blobCache"
import Cache from "../services/Cache"
import h from "../helper/helper"
import keyStore from "./keyStore.service";
import { landingPage } from "./location.manager";
import { withPrefix } from "./storage.service";

export class SessionService {
	sid: string = "";
	loggedin: boolean = false;
	userid: any;
	sessionStorage: Storage = withPrefix("whispeer.session");

	keyStore: any; // This has to change as soon as we port crypto/keyStore

	private loginResolve
	private loginPromise = new Bluebird((loginResolve) => {
		this.loginResolve = loginResolve
	})

	saveSession = () => {
		this.sessionStorage.set("sid", this.sid);
		this.sessionStorage.set("userid", this.userid);
		this.sessionStorage.set("loggedin", true);
	}

	setLoginData = (_sid: string, _userid: any) => {
		this.sid = _sid;
		this.userid = _userid;
		this.loggedin = true;

		this.loginResolve()
	}

	awaitLogin = () => {
		return this.loginPromise
	}

	setPassword = (password: string) => {
		keyStore.security.setPassword(password);
		this.sessionStorage.set("password", password);
	}

	loadLogin = () => {
		return this.sessionStorage.awaitLoading().then(() => {
			const loggedin = this.sessionStorage.get("loggedin") === "true" && this.sessionStorage.get("password");
			if (!loggedin) {
				return this.clear().thenReturn(false);
			}

			this.setPassword(this.sessionStorage.get("password"));
			this.setLoginData(this.sessionStorage.get("sid"), this.sessionStorage.get("userid"));

			return true;
		})
	}

	getSID = () => {
		return this.sid;
	}

	getUserID = () => {
		// parseFloat is slightly faster than parseInt
		return parseFloat(this.userid);
	}

	clear = () => {
		return Bluebird.all([
			blobCache.clear(),
			this.sessionStorage.clear(),
			Bluebird.resolve(Cache.deleteDatabase()),
		].map(p => p.reflect()))
	}

	logout = () => {
		this.clear().finally(landingPage)
	}

	isLoggedin = () => {
		return this.loggedin;
	}
}

export default new SessionService();
