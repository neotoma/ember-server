/**
 * Initialize HTTP server for Ember app
 */

require('dotenvs')(process.env.EMBER_SERVER_ENV);

var express = require('express');
var path = require('path');
var prerenderNode = require('prerender-node');

var app = express();

app.use(prerenderNode);
app.use('/assets', express.static(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'assets')));
app.use('/bower_components', express.static(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'bower_components')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'index.html'));
});

app.listen(process.env.EMBER_SERVER_PORT, () => {
  console.log('Ember server listening on port %s for %s', process.env.EMBER_SERVER_PORT, process.env.EMBER_SERVER_ENV);
});