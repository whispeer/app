import { Component, ViewChild, Injector } from "@angular/core";
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

	constructor(platform: Platform, private injector: Injector) {
		platform.ready().then(() => {
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
