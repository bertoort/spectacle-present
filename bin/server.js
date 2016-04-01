#! /usr/bin/env node

var path = require("path");
var express = require("express");
var webpack = require("webpack");
var config = require("./../webpack.config");
var program = require('commander');
var pkg = require('./../package.json');
var fs = require('./fileSystem')

var app = express();
var compiler = webpack(config);

program
    .version(pkg.version)
    .usage('<index.js> [options]')
    .option('-p, --port [port]', 'Port')
    .parse(process.argv);

if(program.args.length > 2) {
    program.help();
}

var serverPort = program.port || 3000;

var pathArg = program.args[0];
var presentation = path.resolve(pathArg);
var assets = path.resolve("assets");

fs.copySlide(presentation);
fs.copyAssets(assets);
fs.watch(presentation, assets);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(serverPort, "localhost", function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:" + serverPort + '/0');
});
