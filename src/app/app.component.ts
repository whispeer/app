import { Component, ViewChild } from "@angular/core";
import { Platform, NavController } from "ionic-angular";
import { StatusBar, Splashscreen } from "ionic-native";

import { HomePage } from '../pages/home/home';
import { PushService } from "../assets/services/push.service";
import Tutorial from "./tutorial";

@Component({
	templateUrl: "app.html"
})

export class MyApp {

	rootPage = HomePage;

	@ViewChild("navigation") nav: NavController;

	showTutorial() {
		return Tutorial.tutorialVisible;
	}

	slideNumber = 1;
	advance() {
		this.slideNumber++;
		if (this.slideNumber === 6) { Tutorial.skip(); }
	}

	langualge() {
		return 'en'
	}

	currentSlide() {
		return `assets/img/${this.langualge()}/tutorial_step${this.slideNumber}.png`
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
			Tutorial.skip()
		} else {
			this.advance()
		}
	}

	constructor(platform: Platform) {
		platform.ready().then(() => {
			Tutorial.checkVisibility()

			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleLightContent();
			Splashscreen.hide();
		});
	}

	ngAfterViewInit() {
		const pushService = new PushService(this.nav);
		pushService.register();
	}
}
