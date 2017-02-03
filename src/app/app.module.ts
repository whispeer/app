import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from "../pages/login/login"
import { HomePage } from "../pages/home/home";
import { MessagesPage } from "../pages/messages/messages";

import { NewMessageModal } from "../pages/home/newMessage.modal";

import { UserService } from "../assets/services/user.service";

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		MessagesPage,
		LoginPage,
		NewMessageModal
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		MessagesPage,
		LoginPage,
		NewMessageModal
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		UserService
	]
})
export class AppModule {}
