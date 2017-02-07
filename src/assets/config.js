if (typeof define === "function") {
	define([
		"whispeerHelper",
		"conf/base.config.json",
		"conf/" + WHISPEER_ENV + ".config.json"
	], function (h, baseConfig, config) {
		"use strict";

		return h.extend(h.extend({}, baseConfig), config);
	});
}
