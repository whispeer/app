var path = require("path");

module.exports = {
	entryPoint: path.resolve("src/app/main.ts"),
	tsConfigPath: process.env.IONIC_TS_CONFIG
};
