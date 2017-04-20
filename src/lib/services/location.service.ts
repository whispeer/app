import * as StorageService from "./storage.service";
import Storage from "./Storage";
import { Location } from "@angular/common";

import { isBlockedReturnUrl } from "./location.manager";

export default class LocationService {
	location: Location;
	loginStorage: Storage = StorageService.withPrefix("whispeer.login");

	constructor(location: Location) {
		this.location = location;
	}

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
