require("interceptors/addKeysInterceptor");
require("interceptors/sessionServiceInterceptor");
require("services/trust.service");

import { SafeUrl } from "../assets/pipes/safeStyle";
import { ResponsiveDatePipe } from "../assets/pipes/responsiveDate";

import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from "../pages/home/home";
import { MessagesPage } from "../pages/messages/messages";
import { ContactsPage } from "../pages/contacts/contacts";
import { ProfilePage } from "../pages/profile/profile";
import { LoginPage } from "../pages/login/login";
import { SettingsPage } from "../pages/settings/settings";
import { ContactRequestsPage } from "../pages/contact-requests/contact-requests";
import { NewMessagePage } from "../pages/new-message/new-message";

// yep that looks wrong, but this module does not have necessary files for
// aot compilation which is required for production builds. this works however if we use the whole path.
import { QRCodeModule } from "../../node_modules/angular2-qrcode/angular2-qrcode";

import * as Bluebird from 'bluebird';

import { TopicComponent } from "../components/topicDisplay";
import { GalleryComponent } from "../components/gallery/gallery";
import { chooseFriends } from "../components/chooseFriends";
import { MainMenu } from "../components/mainMenu";
import { UserImageComponent } from "../components/userImage";
import { HexagonModule } from "../components/hexagonModule";

import { SyntaxifyDirective } from '../components/syntaxify';

(<any>window).startup = new Date().getTime();

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
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
		ResponsiveDatePipe,
		UserImageComponent,
	],
	imports: [
		IonicModule.forRoot(MyApp, {}, {
			links: [
				{ component: HomePage, name: "Home", segment: "home" },
				{ component: LoginPage, name: "Login", segment: "login" },
				{ component: MessagesPage, name: "Messages", segment: "messages/:topicId", defaultHistory: [HomePage] },
				{ component: ContactsPage, name: "Contacts", segment: "contacts" },
				{ component: ContactRequestsPage, name: "Requests", segment: "requests" },
				{ component: ProfilePage, name: "Profile", segment: "profile/:userId" },
				{ component: SettingsPage, name: "Settings", segment: "settings" },
				{ component: NewMessagePage, name: "New Message", segment: "newMessage" },
				{ component: NewMessagePage, name: "New Message", segment: "newMessage/:receiverIds" }
			]
		}),
		QRCodeModule,
		HexagonModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
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
		UserImageComponent,
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		DatePipe
	]
})
export class AppModule {
	constructor(private zone: NgZone) {
		Bluebird.setScheduler((fn) => {
			(<any>window).Zone.current.scheduleMicroTask('bluebird', fn)
		});
	}
}
