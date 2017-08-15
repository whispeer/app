import * as StorageService from "./storage.service"
import Storage from "./Storage"
import { Location } from "@angular/common" // tslint:disable-line:no-unused-variable

import { isBlockedReturnUrl } from "./location.manager";

export default class LocationService {
	loginStorage: Storage = StorageService.withPrefix("whispeer.login");

	constructor(public location: Location) {}

	loadInitialURL() {
		var returnURL: string = this.loginStorage.get("returnUrl");
		if (returnURL && !isBlockedReturnUrl(returnURL)) {
			this.location.go(returnURL);
			this.loginStorage.remove("returnUrl");
		}

		if (isBlockedReturnUrl(window.top.location.pathname)) {
			this.location.go("/main");
		}
	}
}
