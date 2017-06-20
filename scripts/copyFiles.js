#!/usr/bin/env node

var fromAppToWWW = true;

var fs = require("fs-extra"), path = require("path"), glob = require("glob");

var config = fs.readJsonSync("./scripts/copyFilesConfig.json");

var baseDirApp = config.baseDirApp;
var baseDirWWW = config.baseDirWWW;

var copyAbleFilesPath = "./copyAbleFiles.json";

var toCopyJSON = fs.readFileSync(copyAbleFilesPath);

toCopyJSON = toCopyJSON.toString().replace(/\/\/.*/g, "");

var toCopy = JSON.parse(toCopyJSON);

toCopy.forEach(function (file) {
	var destination = path.join(baseDirApp, file);
	var origin = path.join(baseDirWWW, file);

	if (fromAppToWWW) {
		var tmp = destination;
		destination = origin;
		origin = tmp;
	}

	var toCopyFiles = glob.sync(origin);

	if (toCopyFiles.length === 0) {
		console.warn("No files to copy for: " + file);
	}

	toCopyFiles.forEach(function (wwwGlobFile) {
		var dir = path.dirname(destination);
		var fileName = path.basename(wwwGlobFile);

		fs.copySync(wwwGlobFile, path.join(dir, fileName));
	});
});
