import { NgModule, ErrorHandler } from '@angular/core';
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

import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		MessagesPage,
		FriendsPage,
		ProfilePage,
		SettingsPage,
		FriendRequestsPage,
		NewMessagePage
	],
	imports: [
		IonicModule.forRoot(MyApp, {}, {
			links: [
				{ component: HomePage, name: "Home", segment: "home" },
				{ component: MessagesPage, name: "Messages", segment: "messages/:messageId" },
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
export class AppModule {}
