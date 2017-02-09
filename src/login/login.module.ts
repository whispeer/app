import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './login.component';

import { LoginPage } from "../pages/login/login"

import { UserService } from "../assets/services/user.service";

import { QRCodeModule } from "../../node_modules/angular2-qrcode/angular2-qrcode";

@NgModule({
	declarations: [
		MyApp,
		LoginPage
	],
	imports: [
		IonicModule.forRoot(MyApp, {}, {
			links: [
				{ component: LoginPage, name: "Login", segment: "login" },
			]
		}),
		QRCodeModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		LoginPage
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		UserService
	]
})
export class AppModule {}