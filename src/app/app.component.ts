import { Component, ViewChild } from "@angular/core";
import { Platform, NavController } from "ionic-angular";
import { StatusBar, Splashscreen } from "ionic-native";

import { HomePage } from '../pages/home/home';
import { PushService } from "../assets/services/push.service";

@Component({
	templateUrl: "app.html"
})

export class MyApp {

	rootPage = HomePage;

	@ViewChild("navigation") nav: NavController;

	tutorialVersion = 1;

	tutorialVisible = true;
	showTutorial() {
		return this.tutorialVisible;
	}

	skip() {
		this.tutorialVisible = false;
		localStorage.setItem(
			'tutorialPassed',
			`${this.tutorialVersion}`
		);
	}

	slideNumber = 1;
	advance() {
		this.slideNumber++;
		if (this.slideNumber === 6) { this.skip(); }
	}

	currentSlide() {
		return `assets/img/tutorial_step${this.slideNumber}.png`
	}

	tutorialClicked(event) {
		const { offsetX, offsetY, target } = event
		const { offsetHeight, offsetWidth, nodeName	} = target

		if (nodeName !== 'IMG') {
			return this.advance()
		}

		const px = offsetX / offsetWidth
		const py = offsetY / offsetHeight

		if ((0.73 < px) && (px < 0.98) && (0.03 < py) && (py < 0.10)) {
			this.skip()
		} else {
			this.advance()
		}
	}

	constructor(platform: Platform) {
		platform.ready().then(() => {

			const passedVersion = parseInt(localStorage.getItem('tutorialPassed'), 10)
			this.tutorialVisible = isNaN(passedVersion) || (passedVersion < this.tutorialVersion)

			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleLightContent();
			Splashscreen.hide();

			const pushService = new PushService(this.nav);
			pushService.register();
		});
	}
}
