import * as Bluebird from "bluebird"

import Observer from "../asset/observer";
import Storage from "./Storage";
import blobCache from "../../lib/asset/blobCache"
import h from "../helper/helper"
import keyStore from "./keyStore.service";
import { landingPage } from "./location.manager";
import { withPrefix } from "./storage.service";

export class SessionService extends Observer {
	sid: string = "";
	loggedin: boolean = false;
	userid: any;
	sessionStorage: Storage = withPrefix("whispeer.session");

	keyStore: any; // This has to change as soon as we port crypto/keyStore

	saveSession = () => {
		this.sessionStorage.set("sid", this.sid);
		this.sessionStorage.set("userid", this.userid);
		this.sessionStorage.set("loggedin", true);
	}

	setLoginData = (_sid: string, _userid: any) => {
		this.sid = _sid;
		this.userid = _userid;
		this.loggedin = true;

		setTimeout(() => {
			this.notify("", "ssn.login");
		});
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
			Bluebird.try(() => {
				if (window.indexedDB) {
					window.indexedDB.deleteDatabase("whispeerCache");
				}
			})
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
