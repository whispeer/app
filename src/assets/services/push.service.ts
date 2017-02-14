import {
	Push
} from 'ionic-native';

import * as Bluebird from "bluebird";
import socketService from "./socket.service";
import Storage from "./storage.service";
import errorService from "./error.service";

const initService = require("services/initService");

const sessionStorage = Storage.withPrefix("whispeer.session");

const sjcl = require("sjcl");

const getOrCreatePushkey = () => {
	const storagePushKey = sessionStorage.get("pushKey");
	if (storagePushKey) {
		return sjcl.codec.hex.toBits(storagePushKey);
	}

	const pushKey = sjcl.random.randomWords(8);
	sessionStorage.set("pushKey", sjcl.codec.hex.fromBits(pushKey));

	return pushKey;
}

const getType = () => {
	const platform = (<any>window).device.platform;

	if (platform === "Android") {
		return "android";
	} else if (platform === "iOS") {
		return "ios";
	}
}

const pushConfig = {
	"android": {
		"senderID": "809266780938"
	},
	"ios": {
		"alert": true,
		"badge": true,
		"sound": true
	},
	"windows": {}
}

const initializePush = () => {
	var push = Push.init(pushConfig);


	push.on("registration", function(data) {
		const type = getType()

		Bluebird.all([
			sessionStorage.awaitLoading(),
			initService.awaitLoading(),
			socketService.awaitConnection()
		]).then(function () {
			const pushKey = getOrCreatePushkey();

			return socketService.definitlyEmit("pushNotification.subscribe", {
				token: data.registrationId,
				key: sjcl.codec.hex.fromBits(pushKey),
				type: type
			}, this);
		}).catch(errorService.criticalError);
	});

	push.on("notification", function(data) {

	});
}

export default initializePush;
