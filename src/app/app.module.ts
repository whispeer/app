require("interceptors/addKeysInterceptor");
require("interceptors/sessionServiceInterceptor");
require("services/trust.service");

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePageModule } from "../pages/home/home.module";
import { MessagesPageModule } from "../pages/messages/messages.module";
import { ContactsPageModule } from "../pages/contacts/contacts.module";
import { ProfilePageModule } from "../pages/profile/profile.module";
import { LoginPageModule } from "../pages/login/login.module";
import { SettingsPageModule } from "../pages/settings/settings.module";
import { ContactRequestPageModule } from "../pages/contact-requests/contact-requests.module";
import { NewMessagePageModule } from "../pages/new-message/new-message.module";

import { QRCodeModule } from "../../node_modules/angular2-qrcode/angular2-qrcode";

import * as Bluebird from 'bluebird';

(<any>window).startup = new Date().getTime();

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),

		HomePageModule,
		LoginPageModule,
		MessagesPageModule,
		ContactsPageModule,
		ProfilePageModule,
		SettingsPageModule,
		ContactRequestPageModule,
		NewMessagePageModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		DatePipe
	]
})
export class AppModule {
	constructor(private zone: NgZone) {
		const originalScheduler: any = Bluebird.setScheduler((fn) => {
			originalScheduler(() => {
				this.zone.run(fn)
			});
		});
	}
}
