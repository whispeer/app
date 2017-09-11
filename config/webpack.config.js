var path = require("path");
var webpack = require("webpack");
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
var ModuleConcatPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");
var WebpackBundleSizeAnalyzerPlugin = require("webpack-bundle-size-analyzer").WebpackBundleSizeAnalyzerPlugin;

var data = require(path.resolve("package.json"))

var prodPlugins = [];
if (process.env.IONIC_ENV === "prod") {
  prodPlugins.push(new ModuleConcatPlugin());
}

const commit = require("child_process")
	.execSync("git rev-parse --short HEAD")
	.toString();

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
			}, {
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader"
			}, {
				test: /\.svg$/,
				use: "raw-loader"
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
		ionicWebpackFactory.getCommonChunksPlugin(),
		new webpack.DefinePlugin({
			"WHISPEER_ENV": JSON.stringify(process.env.WHISPEER_ENV || "production"),
			"IONIC_ENV": JSON.stringify(process.env.IONIC_ENV),
			"CLIENT_INFO": JSON.stringify({
				type: "messenger",
				version: data.version,
				commit
			})
		}),
		new webpack.ContextReplacementPlugin(
			/moment\/locale/,
			/\/de|\/en/
		),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "report-chunks.html",
			openAnalyzer: false
		}),
		new WebpackBundleSizeAnalyzerPlugin("./report-size.txt")
	].concat(prodPlugins),

	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	}
};
