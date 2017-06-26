/**
 * Initialize HTTP server for Ember app
 */

var ranger = require('park-ranger')();

var debug = require('debug')('ember-server');
var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var prerenderNode = require('prerender-node');

var app = express();

app.use(prerenderNode);
app.use('/assets', express.static(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'assets')));
app.use('/bower_components', express.static(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'bower_components')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'index.html'));
});

https.createServer(ranger.cert, app).listen(process.env.EMBER_SERVER_HTTPS_PORT, () => {
  debug('Ember server started listening for HTTPS requests', { port: process.env.EMBER_SERVER_HTTPS_PORT });
});

http.createServer(app).listen(process.env.EMBER_SERVER_HTTP_PORT, () => {
  debug('Ember server started listening for HTTP requests', { port: process.env.EMBER_SERVER_HTTP_PORT });
});