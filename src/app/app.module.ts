require("interceptors/addKeysInterceptor");
require("interceptors/sessionServiceInterceptor");
require("services/trust.service");

import { SafeUrl } from "../assets/pipes/safeStyle";

import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from "../pages/home/home";
import { MessagesPage } from "../pages/messages/messages";
import { FriendsPage } from "../pages/friends/friends";
import { ProfilePage } from "../pages/profile/profile";
import { SettingsPage } from "../pages/settings/settings";
import { FriendRequestsPage } from "../pages/friend-requests/friend-requests";
import { NewMessagePage } from "../pages/new-message/new-message";

import { UserService } from "../assets/services/user.service";
// yep that looks wrong, but this module does not have necessary files for
// aot compilation which is required for production builds. this works however if we use the whole path.
import { QRCodeModule } from "../../node_modules/angular2-qrcode/angular2-qrcode";

import sessionService from '../assets/services/session.service';
import * as Bluebird from 'bluebird';

(<any>window).startup = new Date().getTime();

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		MessagesPage,
		FriendsPage,
		ProfilePage,
		SettingsPage,
		FriendRequestsPage,
		NewMessagePage,
		SafeUrl
	],
	imports: [
		IonicModule.forRoot(MyApp, {}, {
			links: [
				{ component: HomePage, name: "Home", segment: "home" },
				{ component: MessagesPage, name: "Messages", segment: "messages/:topicId" },
				{ component: FriendsPage, name: "Friends", segment: "friends" },
				{ component: FriendRequestsPage, name: "Requests", segment: "requests" },
				{ component: ProfilePage, name: "Profile", segment: "profile/:userId" },
				{ component: SettingsPage, name: "Settings", segment: "settings" },
				{ component: NewMessagePage, name: "New Message", segment: "newMessage" }
			]
		}),
		QRCodeModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		MessagesPage,
		FriendsPage,
		ProfilePage,
		SettingsPage,
		FriendRequestsPage,
		NewMessagePage
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		UserService
	]
})
export class AppModule {
	constructor(private zone: NgZone) {
		sessionService.loadLogin();
		Bluebird.setScheduler((fn) => {
			setTimeout(() => {
				this.zone.run(fn);
			}, 0)
		});
	}
}
