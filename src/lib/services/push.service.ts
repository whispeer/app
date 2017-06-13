import { Push } from '@ionic-native/push';

import { NavController, Platform } from "ionic-angular";

import { MessagesPage } from "../../pages/messages/messages";

import * as Bluebird from "bluebird";
import socketService from "./socket.service";
import { withPrefix } from "./storage.service";
import errorService from "./error.service";

const initService = require("./initService");
import messageService from "../messages/messageService";

const sessionStorage = withPrefix("whispeer.session");

const sjcl = require("sjcl");

export class PushService {
	constructor(private navCtrl: NavController, private platform: Platform, private push: Push) {}

	pushInstance: any;

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
		console.log("-> registration", data);
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

	private getActiveNav = () => this.navCtrl.getActive().instance

	private isOnMessagesPage = () => {
		return this.getActiveNav() instanceof MessagesPage
	}

	private isActiveTopic = (topicId) => {
		const navTopicID = this.getActiveNav().navParams.data.topicId

		return parseInt(navTopicID, 10) === parseInt(topicId, 10)
	}

	private goToTopic = (topicId) => {
		if (this.isOnMessagesPage()) {
			if (this.isActiveTopic(topicId)) {
				return;
			}

			const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(index);
		}

		return this.navCtrl.push("Messages", { topicId: topicId });
	}

	private goToUser = (userId) => {
		return this.navCtrl.push("Profile", { userId: userId });
	}

	private goToReference = (reference) => {
		if (reference.type === "message") {
			this.goToTopic(reference.id);
		}

		if (reference.type === "contactRequest") {
			this.goToUser(reference.id);
		}
	}

	private notification = (data) => {
		console.log(data);

		if (data && data.additionalData) {
			const additionalData = data.additionalData;

			Bluebird.all([
				sessionStorage.awaitLoading(),
				initService.awaitLoading()
			]).then(() => {
				if (!additionalData.foreground && additionalData.reference) {
					this.goToReference(additionalData.reference)
				}

				var pushKey = sessionStorage.get("pushKey");

				if (additionalData.encryptedContent && pushKey) {
					if (typeof additionalData.encryptedContent === "object") {
						additionalData.encryptedContent = JSON.stringify(additionalData.encryptedContent)
					}

					pushKey = sjcl.codec.hex.toBits(pushKey);
					additionalData.content = JSON.parse(sjcl.json.decrypt(pushKey, additionalData.encryptedContent));
				}

				if (additionalData.content) {
					return messageService.addSocketMessage(additionalData.content.message);
				}
			}).then(() => {
				this.pushInstance.finish(() => {console.log(`push done at ${new Date()}`)}, () => {console.warn("Finishing push failed!")}, additionalData.notId)
			});
		}
	};

	register = () => {
		try {
			this.pushInstance = this.push.init(this.pushConfig);

			this.pushInstance.on("registration").subscribe(this.registration);
			this.pushInstance.on("notification").subscribe(this.notification);

			this.platform.resume.subscribe(() => {
				console.warn("Resume app");
				this.pushInstance.clearAllNotifications()
			})
		} catch (e) {
			console.warn("Push is not available!");
		}
	}
}
