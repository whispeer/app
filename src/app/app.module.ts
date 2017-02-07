import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from "../pages/login/login"
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

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		MessagesPage,
		LoginPage,
		FriendsPage,
		ProfilePage,
		SettingsPage,
		FriendRequestsPage,
		NewMessagePage
	],
	imports: [
		IonicModule.forRoot(MyApp, {}, {
			links: [
				{ component: LoginPage, name: "Login", segment: "login" },
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
		LoginPage,
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
