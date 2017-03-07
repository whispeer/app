import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './login.component';

import { LoginPage } from "../pages/login/login"

import { UserService } from "../assets/services/user.service";

import { QRCodeModule } from "../../node_modules/angular2-qrcode/angular2-qrcode";
import { HexagonModule } from "../components/hexagonModule";

import * as Bluebird from 'bluebird';

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
		QRCodeModule,
		HexagonModule
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
export class AppModule {
	constructor(private zone: NgZone) {
		Bluebird.setScheduler((fn) => {
			setTimeout(() => {
				this.zone.run(fn);
			}, 0)
		});
	}
}
