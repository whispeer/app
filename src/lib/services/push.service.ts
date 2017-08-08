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

			if (!type) {
				return
			}

			return socketService.definitlyEmit("pushNotification.subscribe", {
				token: data.registrationId,
				key: sjcl.codec.hex.fromBits(pushKey),
				type
			});
		}).catch(errorService.criticalError);
	}

	private getActiveNav = () => this.navCtrl.getActive().instance

	private isOnMessagesPage = () => {
		return this.getActiveNav() instanceof MessagesPage
	}

	private isActiveChat = (chatID) => {
		const navChatID = this.getActiveNav().navParams.data.chatID

		return parseInt(navChatID, 10) === parseInt(chatID, 10)
	}

	private goToChat = (chatID) => {
		if (this.isOnMessagesPage()) {
			if (this.isActiveChat(chatID)) {
				return;
			}

			const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(index);
		}

		return this.navCtrl.push("Messages", { chatID });
	}

	private goToUser = (userId) => {
		return this.navCtrl.push("Profile", { userId: userId });
	}

	private goToReference = (reference) => {
		if (reference.type === "message") {
			this.goToChat(reference.chatID);
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
					const message = additionalData.content.message

					if (message) {
						delete message.meta.sender
						delete message.meta.sendTime
						delete message.meta.topicid
						delete message.meta.messageid
					}

					return messageService.addSocketData(additionalData.content);
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
