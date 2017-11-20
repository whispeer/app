const path = require("path");
const webpack = require("webpack");
const ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);


const ModuleConcatPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");
const PurifyPlugin = require("@angular-devkit/build-optimizer").PurifyPlugin;

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const WebpackBundleSizeAnalyzerPlugin = require("webpack-bundle-size-analyzer").WebpackBundleSizeAnalyzerPlugin;

const data = require(path.resolve("package.json"))

const prodPlugins = [
	new ModuleConcatPlugin(),
	new PurifyPlugin(),
];

const prodLoaders = [
	{
		test: /\.json$/,
		loader: "json-loader"
	},
	{
		test: /\.js$/,
		loader: [
			{
				loader: process.env.IONIC_CACHE_LOADER
			},

			{
				loader: "@angular-devkit/build-optimizer/webpack-loader",
				options: {
					sourceMap: true
				}
			},
		]
	},
	{
		test: /\.ts$/,
		loader: [
			{
				loader: process.env.IONIC_CACHE_LOADER
			},

			{
				loader: "@angular-devkit/build-optimizer/webpack-loader",
				options: {
					sourceMap: true
				}
			},

			{
				loader: process.env.IONIC_WEBPACK_LOADER
			}
		]
	}
];

const devLoaders = [
	{
		test: /\.json$/,
		loader: "json-loader"
	},
	{
		test: /\.ts$/,
		loader: process.env.IONIC_WEBPACK_LOADER
	}, {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		loader: "babel-loader"
	}, {
		test: /\.svg$/,
		use: "raw-loader"
	}
]

function getLoaders(production) {
	if (production && process.env.IONIC_OPTIMIZE_JS === "true") {
		return prodLoaders;
	}

	return devLoaders;
}

const commit = require("child_process")
	.execSync("git rev-parse --short HEAD")
	.toString();

const getConfig = (production) => {
	return {
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
			loaders: getLoaders(production),
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
			new WebpackBundleSizeAnalyzerPlugin("./report-size.txt"),
		].concat(production ? prodPlugins : []),

		// Some libraries import Node modules but don't use them in the browser.
		// Tell Webpack to provide empty mocks for them so importing them works.
		node: {
			fs: "empty",
			net: "empty",
			tls: "empty"
		}
	};
}

module.exports = {
	dev: getConfig(false),
	prod: getConfig(true),
}
