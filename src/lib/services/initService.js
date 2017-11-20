console.warn(`Whispeer startup at ${Date.now()}`)
console.time("Spinner on Home")

var errorService = require("./error.service").errorServiceInstance;
var keyStore = require("crypto/keyStore");
var socketService = require("services/socket.service").default;
var CacheService = require("./Cache").default;

var debug = require("debug");
var Observer = require("asset/observer");
var Bluebird = require("bluebird");

var sessionService = require("services/session.service").default;

var debugName = "whispeer:initService";
var initServiceDebug = debug(debugName);

function time(name) {
	if (debug.enabled(debugName)) {
		console.time("init: " + name);
	}
}

function timeEnd(name) {
	if (debug.enabled(debugName)) {
		console.timeEnd("init: " + name);
	}
}

var initCallbacks = [], initService;

function loadData() {
	keyStore.security.blockPrivateActions();

	var promise = Bluebird.resolve().then(() => {
		time("runInitCallbacks");
		return Bluebird.all(initCallbacks.map((func) => func()))
	}).then(function () {
		timeEnd("runInitCallbacks");
		keyStore.security.allowPrivateActions();

		var migrationService = require("services/migrationService");
		migrationService();
		initService.notify("", "initDone");
		return null;
	});

	promise.catch(errorService.criticalError);

	return promise;
}

var loadingPromise = sessionService.awaitLogin().then(function () {
	return loadData();
});

initService = {
	/** get via api, also check cache in before!
	* @param domain: domain to get from
	*/
	awaitLoading: function () {
		return loadingPromise
	},
	get: function (domain, cb, options) {
		initRequestsList.push({
			domain: domain,
			callback: cb,
			options: options || {}
		});
	},
	registerCallback: function (cb) {
		initCallbacks.push(cb);
	}
};

Observer.extend(initService);

module.exports = initService;
