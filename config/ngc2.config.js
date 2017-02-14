var path = require("path");

module.exports = {
	entryPoint: path.resolve("src/login/login.ts"),
	tsConfigPath: process.env.IONIC_TS_CONFIG
};
