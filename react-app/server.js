var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev.config');
var express = require('express');

var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      // aggregateTimeout: 300,
      poll: 2000
    },
    setup: function(app) {
      app.use(express.static(__dirname + '/build'));
      app.get(/^[^.]+$/, function (request, response) {
        response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
      });
    }
  });

server.listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Dev server running at http://0.0.0.0:3000');
});
