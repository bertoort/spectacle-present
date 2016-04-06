/* eslint-disable */

var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: [
    path.join(__dirname, "node_modules/webpack-hot-middleware/client"),
    path.join(__dirname, "node_modules/babel-polyfill"),
    path.join(__dirname, "index")
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.md$/,
      loader: path.join(__dirname, "html-loader!markdown-loader?gfm=false")
    }, {
      test: /\.(js|jsx)$/,
      exclude: path.join(__dirname, "node_modules"),
      loader: path.join(__dirname, "node_modules/babel-loader")
    }, {
      test: /\.css$/,
      loaders: ["style", "raw"],
      include: __dirname
    }, {
      test: /\.svg$/,
      loader: "url?limit=10000&mimetype=image/svg+xml",
      include: path.join(__dirname, "assets")
    }, {
      test: /\.png$/,
      loader: "url-loader?mimetype=image/png",
      include: path.join(__dirname, "assets")
    }, {
      test: /\.gif$/,
      loader: "url-loader?mimetype=image/gif",
      include: path.join(__dirname, "assets")
    }, {
      test: /\.jpg$/,
      loader: "url-loader?mimetype=image/jpg",
      include: path.join(__dirname, "assets")
    }]
  }
};
