require("interceptors/addKeysInterceptor");
require("interceptors/sessionServiceInterceptor");
require("services/trust.service");

import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { DatePipe } from "@angular/common";

import { IonicApp, IonicErrorHandler } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';

import * as Bluebird from 'bluebird';

import { MyApp } from './app.component';

import { BrowserModule } from '@angular/platform-browser';

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Globalization } from '@ionic-native/globalization';
import { Push } from '@ionic-native/push';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

(<any>window).startup = new Date().getTime();

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		IonicModule.forRoot(MyApp),
		BrowserModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		DatePipe,
		SplashScreen,
		StatusBar,
		Globalization,
		Push,
		PhotoViewer,
		ImagePicker,
		File,
		Camera,
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
