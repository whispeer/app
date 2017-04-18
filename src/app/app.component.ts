import { Component, ViewChild, NgZone } from "@angular/core";
import { Platform, NavController } from "ionic-angular";

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Globalization } from '@ionic-native/globalization';
import { Push } from '@ionic-native/push';

import { PushService } from "../assets/services/push.service";
import Tutorial from "./tutorial";

import sessionService from '../assets/services/session.service';

const tutorialDisabled = ["login"]

@Component({
	templateUrl: "app.html"
})

export class MyApp {

	rootPage = "Home";

	@ViewChild("navigation") nav: NavController;

	showTutorial = () => {
		const activeView = this.nav.getActive()

		return activeView && tutorialDisabled.indexOf(activeView.id) === -1 && Tutorial.tutorialVisible;
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

	constructor(platform: Platform, private zone: NgZone, private splashScreen: SplashScreen, private statusBar: StatusBar, private globalization: Globalization, private push: Push) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleLightContent();
			this.splashScreen.hide();

			const pushService = new PushService(this.nav, platform, this.push);
			pushService.register();

			sessionService.loadLogin().then((loggedin) => {
				if (!loggedin) {
					this.nav.remove(0, this.nav.length() - 1)
					this.nav.setRoot("Login")
				} else {
					this.initializeTutorialWithLanguage();
				}
			});
		});
	}
}
