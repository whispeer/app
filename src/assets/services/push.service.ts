import {
	Push
} from 'ionic-native';

import { NavController } from "ionic-angular";

import { MessagesPage } from "../../pages/messages/messages";

import * as Bluebird from "bluebird";
import socketService from "./socket.service";
import { withPrefix } from "./storage.service";
import errorService from "./error.service";

const initService = require("./initService");
const messageService = require("../messages/messageService");

const sessionStorage = withPrefix("whispeer.session");

const sjcl = require("sjcl");

export class PushService {
	constructor(private navCtrl: NavController) {}

	private getOrCreatePushkey = () => {
		const storagePushKey = sessionStorage.get("pushKey");
		if (storagePushKey) {
			return sjcl.codec.hex.toBits(storagePushKey);
		}

		const pushKey = sjcl.random.randomWords(8);
		sessionStorage.set("pushKey", sjcl.codec.hex.fromBits(pushKey));

		return pushKey;
	}

	getType = () => {
		const platform = (<any>window).device.platform;

		if (platform === "Android") {
			return "android";
		} else if (platform === "iOS") {
			return "ios";
		}
	}

	private pushConfig = {
		"android": {
			"senderID": "809266780938",
			"icon": "ic_stat_icon",
			"iconColor": "#5ab70d"
		},
		"ios": {
			"alert": true,
			"badge": true,
			"sound": true
		}
	}

	private registration = (data) => {
		console.log("-> registartion", data);
		const type = this.getType()

		Bluebird.all([
			sessionStorage.awaitLoading(),
			initService.awaitLoading(),
			socketService.awaitConnection()
		]).then(() => {
			const pushKey = this.getOrCreatePushkey();

			return socketService.definitlyEmit("pushNotification.subscribe", {
				token: data.registrationId,
				key: sjcl.codec.hex.fromBits(pushKey),
				type: type
			});
		}).catch(errorService.criticalError);
	}

	private notification = (data) => {
		if (data && data.additionalData) {
			Bluebird.all([
				sessionStorage.awaitLoading(),
				initService.awaitLoading()
			]).then(() => {
				const topicId = data.additionalData.topicid;

				if (!data.additionalData.foreground && topicId) {
					console.log("-> click", topicId);
					return this.navCtrl.push(MessagesPage, { topicId: topicId });
				}

				var pushKey = sessionStorage.get("pushKey");

				if (data.additionalData.encryptedContent && pushKey) {
					pushKey = sjcl.codec.hex.toBits(pushKey);
					data.additionalData.content = JSON.parse(sjcl.json.decrypt(pushKey, JSON.stringify(data.additionalData.encryptedContent)));
				}

				if (data.additionalData.content) {
					messageService.addSocketMessage(data.additionalData.content);
				}
			});
		}
	};

	register = () => {
		try {
			var push = Push.init(this.pushConfig);

			push.on("registration", this.registration);
			push.on("notification", this.notification);
		} catch (e) {
			console.warn("Push is not available!");
		}
	}
}
