var path = require("path");
var webpack = require("webpack");
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

var WebpackBundleSizeAnalyzerPlugin = require("webpack-bundle-size-analyzer").WebpackBundleSizeAnalyzerPlugin;

process.env.WHISPEER_ENV = process.env.WHISPEER_ENV || "production";

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
		loaders: [{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				//test: /\.(ts|ngfactory.js)$/,
				test: /\.ts$/,
				loader: process.env.IONIC_WEBPACK_LOADER
			}, {
				test: /\.js$/,
				loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
			}
		],
		noParse: [
			/sjcl\.js$/,
			/socket\.io\.slim/,
			/visionmedia-debug\/.*debug\.js$/,
		]
	},

	plugins: [
		ionicWebpackFactory.getIonicEnvironmentPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "external",
			minChunks: function (module) {
				return module.context && module.context.indexOf("node_modules") !== -1;
			}
		}),
		new webpack.DefinePlugin({
			"WHISPEER_ENV": JSON.stringify(process.env.WHISPEER_ENV)
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "report-chunks.html",
			openAnalyzer: false
		}),
		new WebpackBundleSizeAnalyzerPlugin("./report-size.txt")
	],

	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	}
};
