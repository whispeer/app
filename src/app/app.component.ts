import { Component, ViewChild } from "@angular/core";
import { Platform, NavController } from "ionic-angular";
import * as Bluebird from 'bluebird';

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Globalization } from '@ionic-native/globalization';
import { Push } from '@ionic-native/push';
import { Keyboard } from '@ionic-native/keyboard';

import { PushService } from "../lib/services/push.service";
import socketService from "../lib/services/socket.service";
import { isBusinessVersion } from "../lib/services/location.manager";
import Tutorial from "./tutorial";

import sessionService from '../lib/services/session.service';

// When we think it's safe to hide the splash screen, there might actually be
// some more drawing going on. This delay is to offset for that rendering.
const SPLASH_SCREEN_HIDE_DELAY = 200

const TUTORIAL_SLIDES = 7

const setHeight = (height: number) => {
	const ele = document.getElementsByTagName("ion-nav")[0]

	if (ele instanceof HTMLElement) {
		ele.style.height = height ? `calc(100% - ${height}px)` : ""
	}

	return true
}

@Component({
	templateUrl: "app.html"
})

export class MyApp {
	rootPage = "Home";

	@ViewChild("navigation") nav: NavController;

	showTutorial = () => {
		const activeView = this.nav.getActive()

		if (!activeView || !activeView.instance) {
			return false
		}

		return !activeView.instance.tutorialDisabled && Tutorial.tutorialVisible;
	}

	slideNumber = 1;
	advance() {
		this.slideNumber++;
		if (this.slideNumber === TUTORIAL_SLIDES + 1) {
			this.slideNumber = 1;
			Tutorial.skip();
		}
	}

	lang = 'de';
	currentSlide() {
		return `assets/img/${this.lang}/tutorial_${this.slideNumber}.png`
	}

	tutorialClicked(event) {
		const { offsetX, offsetY, target } = event;
		const { offsetHeight, offsetWidth, nodeName } = target;

		if (nodeName !== 'IMG') {
			return this.advance();
		}

		const px = offsetX / offsetWidth;
		const py = offsetY / offsetHeight;
		const firstSlide = this.slideNumber === 1
		const shouldSkip = (0.73 < px) && (px < 0.98) && (0.03 < py) && (py < 0.10)

		if (shouldSkip && firstSlide) {
			Tutorial.skip();
		} else {
			this.advance();
		}
	}

	initializeTutorialWithLanguage() {
		this.globalization.getPreferredLanguage().then(({ value }) => {
			const en = (value.toLowerCase().indexOf('de') === -1);
			this.lang = en ? 'en' : 'de';
		}).catch(() => {
			console.warn('Cannot get language from device, remaining with default language');
		}).then(() => {
			Tutorial.checkVisibility();
		})
	}

	constructor(
		platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private globalization: Globalization,
		private push: Push,
		private keyboard: Keyboard
	) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleLightContent();

			const pushService = new PushService(this.nav, platform, this.push);

			if(platform.is("ios")) {
				this.keyboard.disableScroll(true)

				window.addEventListener('native.keyboardshow', (e: any) => setHeight(e.keyboardHeight))
				window.addEventListener('native.keyboardhide', () => setHeight(0))
			}

			socketService.addInterceptor({
				transformResponse: (response) => {
					if (isBusinessVersion() && response.logedin && !response.error) {
						const activeNav = this.nav.getActive()
						const onSalesPage = activeNav && activeNav.component.name === "SalesPage"

						if (onSalesPage && response.isBusiness) {
							this.nav.remove(0, this.nav.length() - 1)
							this.nav.setRoot("Home")
						}

						if (!onSalesPage && !response.isBusiness) {
							this.nav.remove(0, this.nav.length() - 1)
							this.nav.setRoot("Sales")
						}
					}

					return response
				}
			})

			if (sessionService.isLoggedin()) {
				pushService.register()
			}

			sessionService.listen(() => pushService.register(), "login")
			sessionService.listen(() => pushService.unregister(), "logout")

			sessionService.bootLogin().then((loggedin) => {
				Bluebird.delay(SPLASH_SCREEN_HIDE_DELAY).then(() => this.splashScreen.hide())
				if (!loggedin && this.nav.length() > 0) {
					this.nav.remove(0, this.nav.length() - 1)
					this.nav.setRoot("Login")
				}

				this.initializeTutorialWithLanguage();
			});
		});
	}
}
