import {
	Push
} from 'ionic-native';

import * as Bluebird from "bluebird";
import socketService from "./socket.service";
import Storage from "./storage.service";
import errorService from "./error.service";

const initService = require("services/initService");
const messageService = require("services/messageService");

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
		"senderID": "809266780938",
		"icon": "ic_stat_icon"
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
		if (data && data.additionalData) {
			Bluebird.all([
				sessionStorage.awaitLoading(),
				initService.awaitLoading()
			]).then(function () {
				var topicid = data.additionalData.topicid;

				if (!data.additionalData.foreground && topicid) {
					// $state.go("chat-detail", { chatId: topicid });
				}

				var pushKey = sessionStorage.get("pushKey");

				if (data.additionalData.encryptedContent && pushKey) {
					pushKey = sjcl.codec.hex.toBits(pushKey);
					data.additionalData.content = JSON.parse(sjcl.json.decrypt(pushKey, JSON.stringify(data.additionalData.encryptedContent)));
				}

				if (data.additionalData.content) {
					messageService.addData(data.additionalData.content);
				}
			});
		}
	});
}

export default initializePush;
