var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

process.env.WHISPEER_ENV = process.env.WHISPEER_ENV || "production";

module.exports = {
  entry: {
    login: path.resolve("src/login/login.ts"),
    main: path.resolve("src/app/main.ts"),
  },
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: "cheap-inline-source-map", //process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('src/assets/'), path.resolve('node_modules')],
    alias: {
      whispeerHelper: "helper/helper",
      workerQueue: "worker/worker-queue",
      PromiseWorker: "worker/worker-loader",
      imageLib: "blueimp-load-image/js/load-image",
      toBlob: "blueimp-canvas-to-blob/js/canvas-to-blob"
    }
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        //test: /\.(ts|ngfactory.js)$/,
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    // ionicWebpackFactory.getNonIonicCommonChunksPlugin(),
    // ionicWebpackFactory.getIonicCommonChunksPlugin(),
    new webpack.DefinePlugin({
    	"WHISPEER_ENV": JSON.stringify(process.env.WHISPEER_ENV)
    })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
