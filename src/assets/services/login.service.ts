import State from "../asset/state";
import * as Bluebird from "bluebird";
import { withPrefix } from "../services/storage.service";

import socketService from "../services/socket.service";

import { mainPage, loginPage, isLoginPage } from "../services/location.manager";

const chelper = require("crypto/helper");
const errors = require("asset/errors");

const loginState = new State();

const failureCodes = {
	UNKNOWNNAME: 0,
	WRONGPASSWORD: 1,
	NOCONNECTION: 2,
	SECURITY: 4,
	UNKNOWN: 5
};

const sessionStorage = withPrefix("whispeer.session");
const loginStorage = withPrefix("whispeer.login");

function upgradeLocalStorage() {
	try {
		if (localStorage.getItem("loggedin") === "true") {
			var sid = localStorage.getItem("sid");
			var userid = localStorage.getItem("userid");
			var password = localStorage.getItem("password");

			localStorage.clear();

			//migrate to new format
			sessionStorage.set("loggedin", "true");
			sessionStorage.set("sid", sid);
			sessionStorage.set("userid", userid);
			sessionStorage.set("password", password);
		}
	} catch (e) {
		console.warn("no local storage");
	}
}

upgradeLocalStorage();

class LoginService {
	identifier: string;
	password: string = "";
	failureCode: number;
	state = loginState.data;
	failedOnce = false;
	loadedStorage: Bluebird<void>;

	constructor () {
		this.identifier = loginStorage.get("identifier");
		this.failureCode = parseInt(loginStorage.get("failureCode"), 10);

		this.loadedStorage = loginStorage.awaitLoading().then(() => {
			this.identifier = loginStorage.get("identifier");
			this.failureCode = parseInt(loginStorage.get("failureCode"), 10);

			loginStorage.remove("failureCode");
			loginStorage.save();

			return null;
		});

		sessionStorage.awaitLoading().then(function () {
			if (sessionStorage.get("loggedin") === "true") {
				mainPage();
			}
		});
	}

	loginServer (name: string, password: string, callback?: Function) {
		return Bluebird.try(() => {
			return socketService.emit("session.token", {
				identifier: name
			});
		}).catch(function (e) {
			if (e.name === "disconnectedError") {
				throw new errors.LoginError("Login failed", { failure: failureCodes.NOCONNECTION });
			}

			console.log(e);
			throw new errors.LoginError("Login failed", { failure: failureCodes.UNKNOWNNAME });
		}).then((data) => {
			if (data.salt.length !== 16) {
				throw new errors.LoginError("Login failed", { failure: failureCodes.SECURITY });
			}

			var hash = chelper.hashPW(password, data.salt);

			hash = chelper.hash(hash + data.token);
			return socketService.emit("session.login", {
				identifier: name,
				password: hash,
				token: data.token
			}).catch(function (e: any) {
				if (e.name === "disconnectedError") {
					throw new errors.LoginError("Login failed", { failure: failureCodes.NOCONNECTION });
				}

				console.log(e);
				throw new errors.LoginError("Login failed", { failure: failureCodes.WRONGPASSWORD });
			});
		}).then(function (data) {
			sessionStorage.set("sid", data.sid);
			sessionStorage.set("userid", data.userid);
			sessionStorage.set("loggedin", true);
			sessionStorage.set("password", password);

			return sessionStorage.save();
		}).catch(function (e) {
			console.log(e);
			throw e;
		}).nodeify(callback);
	};

	login () {
		loginState.pending();

		loginStorage.set("identifier", this.identifier || "");
		loginStorage.save().then(() => {
			return this.loginServer(this.identifier, this.password);
		}).then(() => {
			loginState.success();
			mainPage();
		}).catch((e) => {
			loginState.failed();

			this.failureCode = e.data.failure;
			this.failedOnce = true;

			if (!isLoginPage()) {
				loginStorage.set("failureCode", e.failure);
				loginStorage.save().then(() => {
					loginPage();
				});
			}
		});
	}
};

export default new LoginService();
