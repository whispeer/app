import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from "../pages/login/login"
import { HomePage } from "../pages/home/home";
import { MessagesPage } from "../pages/messages/messages";
import { FriendsPage } from "../pages/friends/friends";
import { ProfilePage } from "../pages/profile/profile";
import { SettingsPage } from "../pages/settings/settings";

import { NewMessageModal } from "../pages/home/newMessage.modal";

import { UserService } from "../assets/services/user.service";

import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		MessagesPage,
		LoginPage,
		FriendsPage,
		ProfilePage,
		SettingsPage,
		NewMessageModal
	],
	imports: [
		IonicModule.forRoot(MyApp, {}, {
			links: [
				{ component: LoginPage, name: "Login", segment: "login" },
				{ component: HomePage, name: "Home", segment: "home" },
				{ component: MessagesPage, name: "Messages", segment: "messages/:messageId" },
				{ component: FriendsPage, name: "Friends", segment: "friends" },
				{ component: ProfilePage, name: "Profile", segment: "profile/:userId" },
				{ component: SettingsPage, name: "Settings", segment: "settings" }
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
		NewMessageModal
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		UserService
	]
})
export class AppModule {}
