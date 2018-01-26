import * as StorageService from "./storage.service"
import Storage from "./Storage"
import h from "../helper/helper"

const loginStorage: Storage = StorageService.withPrefix("whispeer.login");
const sessionStorage: Storage = StorageService.withPrefix("whispeer.session");

const blockedReturnUrls: string[] = ["/b2c", "/recovery"];

const basePath = window.top.location.href.match(/([^?#]*)/)[0]
const basePathname = basePath.match(/(.*)\/.*/)[1]

const setTopLocation = (url: string) => {
	console.warn("set top location", url, basePath + url)
	window.top.location.href = basePath + url
}

const setTopPath = (url: string) => {
	console.warn("set top path", url, basePathname + url)
	window.top.location.href = basePathname + url
}

export const landingPage = () => {
	setTopLocation("#/nav/n4/login")
	window.top.location.reload()
}

export const isIOS = () => window.device && window.device.platform === "iOS"

export const isLoginPage = () => {
	return window.top.location.pathname.indexOf("/login") !== -1;
}

export const isBusinessVersion = () => {
	return window.top.location.pathname.indexOf("business.html") !== -1
}

export const goToPrivateHome = () => {
	sessionStorage.remove("business")
	setTopPath("/index.html")
}

export const loginPage = () => {
	setTopLocation("#/nav/n4/login");
}

export const goToBusinessVersion = () => {
	sessionStorage.set("business", "true")
	setTopPath("/business.html")
}

export const reloadApp = () => {
	if (isBusinessVersion()) {
		goToBusinessVersion()
	} else {
		goToPrivateHome()
	}
}

export const isBlockedReturnUrl = (url: string) => {
	return blockedReturnUrls.filter((blockedUrl: string) => {
		return url.indexOf(blockedUrl) !== -1;
	}).length > 0;
};

export const setReturnUrl = (url: string) => {
	if (isBlockedReturnUrl(url)) {
		return;
	}

	loginStorage.set("returnUrl", url);
};

export const getUrlParameter = (param: any) => {
	var search = window.top.location.search;
	var pairs = search.substr(1).split("&");

	var result = h.array.find(pairs.map((pair: any) => {
		if (pair.indexOf("=") !== -1) {
			return {
				key: pair.substr(0, pair.indexOf("=")),
				value: pair.substr(pair.indexOf("=") + 1)
			};
		} else {
			return {
				key: pair,
				value: ""
			};
		}
	}), (pair: any) => {
		return pair.key === param;
	});

	if (result) {
		return result.value;
	}
}
