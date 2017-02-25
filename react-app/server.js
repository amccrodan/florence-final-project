var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express = require('express');

var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    setup: function(app) {
      app.use(express.static(__dirname));
      app.get(/^[^.]+$/, function (request, response) {
        response.sendFile(path.resolve(__dirname, 'index.html'))
      });
    }
  });

server.listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Running at http://0.0.0.0:3000');
});
