require("interceptors/addKeysInterceptor");
require("interceptors/sessionServiceInterceptor");
require("services/trust.service");

import { SafeUrl } from "../assets/pipes/safeStyle";

import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from "../pages/home/home";
import { MessagesPage } from "../pages/messages/messages";
import { ContactsPage } from "../pages/contacts/contacts";
import { ProfilePage } from "../pages/profile/profile";
import { SettingsPage } from "../pages/settings/settings";
import { ContactRequestsPage } from "../pages/contact-requests/contact-requests";
import { NewMessagePage } from "../pages/new-message/new-message";

// yep that looks wrong, but this module does not have necessary files for
// aot compilation which is required for production builds. this works however if we use the whole path.
import { QRCodeModule } from "../../node_modules/angular2-qrcode/angular2-qrcode";

import sessionService from '../assets/services/session.service';
import * as Bluebird from 'bluebird';

import { loginPage } from "../assets/services/location.manager";

import { TopicComponent } from "../components/topicDisplay";
import { GalleryComponent } from "../components/gallery/gallery";
import { chooseFriends } from "../components/chooseFriends";
import { MainMenu } from "../components/mainMenu";


import { SyntaxifyDirective } from '../components/syntaxify';

(<any>window).startup = new Date().getTime();

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		MessagesPage,
		ContactsPage,
		ProfilePage,
		SettingsPage,
		ContactRequestsPage,
		NewMessagePage,
		TopicComponent,
		GalleryComponent,
		chooseFriends,
		MainMenu,
		SafeUrl,
		SyntaxifyDirective,
	],
	imports: [
		IonicModule.forRoot(MyApp, {}, {
			links: [
				{ component: HomePage, name: "Home", segment: "home" },
				{ component: MessagesPage, name: "Messages", segment: "messages/:topicId" },
				{ component: ContactsPage, name: "Contacts", segment: "contacts" },
				{ component: ContactRequestsPage, name: "Requests", segment: "requests" },
				{ component: ProfilePage, name: "Profile", segment: "profile/:userId" },
				{ component: SettingsPage, name: "Settings", segment: "settings" },
				{ component: NewMessagePage, name: "New Message", segment: "newMessage" },
				{ component: NewMessagePage, name: "New Message", segment: "newMessage/:receiverIds" }
			]
		}),
		QRCodeModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		MessagesPage,
		ContactsPage,
		ProfilePage,
		SettingsPage,
		ContactRequestsPage,
		NewMessagePage,
		TopicComponent,
		GalleryComponent,
		chooseFriends,
		MainMenu
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {
	constructor(private zone: NgZone) {
		Bluebird.setScheduler((fn) => {
			setTimeout(() => {
				this.zone.run(fn);
			}, 0)
		});

		sessionService.loadLogin().then((loggedin) => {
			if (!loggedin) {
				loginPage();
			}
		});
	}
}
