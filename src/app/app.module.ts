declare type positionType = { x: number, y: number, width: number, height: number }

declare global {
	interface Window {
		device: any;
		Zone: any;
		whispeerGetStorage: any;
		FilePicker: {
			pickFile: (resolve: Function, reject: Function, utis?: string[], position?: positionType) => void
		};
		fileChooser: {
			open: (resolve: Function, reject: Function) => void
		},
		FilePath: {
			resolveNativePath: (url: string, resolve: Function, reject: Function) => void
		}
	}

	const IONIC_ENV: string
}

require("interceptors/addKeysInterceptor");
require("interceptors/sessionServiceInterceptor");
require("services/trust.service");
require("blueimp-canvas-to-blob/js/canvas-to-blob")

import moment from 'moment';

import { NgModule, ErrorHandler, NgZone } from '@angular/core'; // tslint:disable-line:no-unused-variable
import { DatePipe } from "@angular/common";

import { Platform, IonicApp, IonicErrorHandler, IonicModule, Config } from 'ionic-angular';

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
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Media } from '@ionic-native/media';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';

import { isBusinessVersion } from "../lib/services/location.manager";

import "../lib/services/featureToggles"
import "../lib/services/settings.service"

(window as any).startup = new Date().getTime();

export function createTranslateLoader(http: Http) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import 'moment/locale/de';

const DEFAULT_LANG = "de"

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		IonicModule.forRoot(MyApp, {
			scrollPadding: false,
			scrollAssist: true,
			autoFocusAssist: false
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
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
		Camera,
		InAppBrowser,
		Media,
	]
})
export class AppModule {

	tasks: any[] = []
	taskRunnerStarted: Boolean = false

	startTaskRunner = () => {
		if (this.taskRunnerStarted || this.tasks.length === 0) {
			return
		}

		this.taskRunnerStarted = true
		setTimeout(this.runTasks, 0)
	}

	runTasks = () => {
		this.taskRunnerStarted = false

		const tasksStarted = Date.now()
		const maxTaskCount = this.tasks.length

		for (let i = 0; i < maxTaskCount; i += 1) {
			const task = this.tasks.shift()
			task()

			const dateDiff = Date.now() - tasksStarted

			/*if (dateDiff > 50) {
				console.error(`Long running task detected ${dateDiff}`, task)
			}*/

			if (i + 1 !== maxTaskCount && dateDiff > 20) {
				// console.warn(`Breaking out of tasks loop ${i+1} / ${maxTaskCount} / ${this.tasks.length}: ${dateDiff}`)
				break;
			}
		}

		this.startTaskRunner()
	}

	runInAngularZone(fn) {
		if((<any>this.zone).inner !== window.Zone.current) {
			this.zone.run(fn)
			return
		}

		fn()
	}

	disableContextMenues = () => {
		// disable context menu, e.g., on long clicking the fab button.
		window.addEventListener("contextmenu", e => e.preventDefault())
	}

	constructor(
		private zone: NgZone,
		private translate: TranslateService, // tslint:disable-line:no-unused-variable
		private globalization: Globalization,
		private config: Config, // tslint:disable-line:no-unused-variable
		private platform: Platform // tslint:disable-line:no-unused-variable
	) {
		translate.setDefaultLang("en");

		// this used to be a huge problem with long click in chrome.
		this.disableContextMenues()

		platform.ready().then(() => {
			this.globalization.getPreferredLanguage().then(({ value }) => {
				console.warn(`Language from device: ${value}`)
				return value.split("-")[0].toLowerCase()
			}).catch(() => {
				console.warn('Cannot get language from device, remaining with default language');
				return DEFAULT_LANG
			}).then((lang) => {
				moment.locale(lang);

				if (isBusinessVersion()) {
					translate.use(`${lang}_business`)
					return
				}

				translate.use(lang)
			}).then(() => {
				translate.get('general.backButtonText').subscribe((val: string) => {
					config.set('ios', 'backButtonText', val);
				})
			})
		})

		if (IONIC_ENV === "prod") {
			Bluebird.config({
				warnings: false,
				longStackTraces: false,
				cancellation: false,
				monitoring: false
			})
		}

		Bluebird.setScheduler((fn) => {
			this.tasks.push(fn)

			this.runInAngularZone(this.startTaskRunner)
		});
	}
}
