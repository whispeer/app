import { Component, ViewChild } from "@angular/core";
import { Platform, NavController } from "ionic-angular";

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Globalization } from '@ionic-native/globalization';
import { Push } from '@ionic-native/push';

import { PushService } from "../lib/services/push.service";
import socketService from "../lib/services/socket.service";
import { isBusinessVersion } from "../lib/services/location.manager";
import Tutorial from "./tutorial";

import sessionService from '../lib/services/session.service';

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
		if (this.slideNumber === 6) {
			this.slideNumber = 1;
			Tutorial.skip();
		}
	}

	lang = 'en';
	currentSlide() {
		return `assets/img/${this.lang}/tutorial_step${this.slideNumber}.png`
	}

	tutorialClicked(event) {
		const { offsetX, offsetY, target } = event;
		const { offsetHeight, offsetWidth, nodeName } = target;

		if (nodeName !== 'IMG') {
			return this.advance();
		}

		const px = offsetX / offsetWidth;
		const py = offsetY / offsetHeight;

		if ((0.73 < px) && (px < 0.98) && (0.03 < py) && (py < 0.10)) {
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
		private push: Push
	) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleLightContent();

			const pushService = new PushService(this.nav, platform, this.push);
			pushService.register();

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

			sessionService.loadLogin().then((loggedin) => {
				this.splashScreen.hide();

				if (!loggedin && this.nav.length() > 0) {
					this.nav.remove(0, this.nav.length() - 1)
					this.nav.setRoot("Login")
				}

				this.initializeTutorialWithLanguage();
			});
		});
	}
}
