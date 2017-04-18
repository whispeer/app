var path = require("path");
var webpack = require("webpack");
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

process.env.WHISPEER_ENV = process.env.WHISPEER_ENV || "production";

var isExternal = /node_modules[^!]*\.js$/

module.exports = {
	entry: process.env.IONIC_APP_ENTRY_POINT,
	output: {
		path: "{{BUILD}}",
		publicPath: "build/",
		filename: "[name].js",
		devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
	},
	devtool: process.env.IONIC_SOURCE_MAP_TYPE,

	resolve: {
		extensions: [".ts", ".js", ".json"],
		modules: [path.resolve("src/assets/"), path.resolve("node_modules")],
		alias: {
			whispeerHelper: "helper/helper",
			workerQueue: "worker/worker-queue",
			PromiseWorker: "worker/worker-loader",
			imageLib: "blueimp-load-image/js/load-image",
			toBlob: "blueimp-canvas-to-blob/js/canvas-to-blob"
		}
	},

	module: {
		loaders: [{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				//test: /\.(ts|ngfactory.js)$/,
				test: /\.ts$/,
				loader: process.env.IONIC_WEBPACK_LOADER
			}
		],
		noParse: [
			/sjcl\.js$/,
			/socket\.io\.js$/,
			/visionmedia-debug\/.*debug\.js$/,
		]
	},

	plugins: [
		ionicWebpackFactory.getIonicEnvironmentPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "external",
			minChunks: function (module) {
				return module.chunks[0].name === "main" &&
					module.request && isExternal.test(module.request)
			}
		}),
		new webpack.DefinePlugin({
			"WHISPEER_ENV": JSON.stringify(process.env.WHISPEER_ENV)
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "report.html",
			openAnalyzer: false
		})
	],

	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	}
};
