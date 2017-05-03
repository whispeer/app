require("interceptors/addKeysInterceptor");
require("interceptors/sessionServiceInterceptor");
require("services/trust.service");

import { NgModule, ErrorHandler, NgZone } from '@angular/core';
import { DatePipe } from "@angular/common";

import { IonicApp, IonicErrorHandler, IonicModule, Config } from 'ionic-angular';

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
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';

(<any>window).startup = new Date().getTime();

const createTranslateLoader = (http: Http) => {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_LANG = "en"

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		IonicModule.forRoot(MyApp),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [Http]
			}
		}),
		BrowserModule,
		HttpModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		DatePipe,
		BarcodeScanner,
		SplashScreen,
		StatusBar,
		Globalization,
		Push,
		PhotoViewer,
		ImagePicker,
		File,
		Camera
	]
})
export class AppModule {
	constructor(private zone: NgZone, private translate: TranslateService, private globalization: Globalization, private config: Config) {
		translate.setDefaultLang("en");

		this.globalization.getPreferredLanguage().then(({ value }) => {
			console.warn(`Language from device: ${value}`)
			return DEFAULT_LANG
		}).catch(() => {
			console.warn('Cannot get language from device, remaining with default language');
			return DEFAULT_LANG
		}).then((lang) => {
			translate.use(lang)
		})

		translate.get('general.backButtonText').subscribe((val: string) => {
			config.set('ios', 'backButtonText', val);
		})

		Bluebird.setScheduler((fn) => {
			setTimeout(() => {
				if((<any>this.zone).inner !== (<any>window).Zone.current) {
					this.zone.run(fn)
					return
				}

				fn()
			}, 0);
		});
	}
}
