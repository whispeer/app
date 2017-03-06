#!/usr/bin/env node

var configFile = "./config.xml";

var fs = require("fs");

var versionIncrease = 100;

var xml2js = require("xml2js");
var xml = fs.readFileSync(configFile);

xml2js.parseString(xml, function (err, result) {
	var version = result.widget.$.version.split(".").reverse();

	var versionCode = version.reduce(function (prev, next, index) {
		return prev + next * Math.pow(versionIncrease, index + 1);
	}, 0);

	var builder = new xml2js.Builder({
		renderOpts: {
			indent: "	",
			pretty: true
		}
	});

	result.widget.$["android-versionCode"] = versionCode;

	var xmlResult = builder.buildObject(result);
	fs.writeFileSync(configFile, xmlResult);
})
