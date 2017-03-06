var configFile = "./config.xml";

var fs = require("fs");

var versionIncrease = 100;

var xml2js = require("xml2js");
var xml = fs.readFileSync(configFile);

xml2js.parseString(xml, function (err, result) {
	var version = result.widget.$.version.split(".")

	var versionCode = version[2] * versionIncrease + version[1] * versionIncrease * versionIncrease + version[0] * versionIncrease * versionIncrease * versionIncrease

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
