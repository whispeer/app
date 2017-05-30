var path = require("path");
var webpack = require("webpack");
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

module.exports = {
	entry: process.env.IONIC_APP_ENTRY_POINT,
	output: {
		path: "{{BUILD}}",
		publicPath: "build/",
		filename: "deptree.js",
	},

	resolve: {
		extensions: [".js", ".ts"],
		modules: [path.resolve("src/lib/"), path.resolve("node_modules")],
		alias: {
			whispeerHelper: "helper/helper",
			workerQueue: "worker/worker-queue",
			PromiseWorker: "worker/worker-loader",
			imageLib: "blueimp-load-image/js/load-image",
			toBlob: "blueimp-canvas-to-blob/js/canvas-to-blob",
			json3: "asset/json"
		}
	},

	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: process.env.IONIC_OPTIMIZATION_LOADER
			},
			{
				test: /\.js$/,
				loader: process.env.IONIC_OPTIMIZATION_LOADER
			}
		]
	},

	plugins: [
		ionicWebpackFactory.getIonicEnvironmentPlugin(),
	],

	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	}
};
