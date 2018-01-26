/**
 * Initialize HTTP server for Ember app
 */

var ranger = require('park-ranger')();

var compression = require('compression'),
  debug = require('debug')('ember-server'),
  express = require('express'),
  fastbootMiddleware = require('fastboot-express-middleware'),
  http = require('http'),
  https = require('https'),
  path = require('path'),
  serveStatic = require('serve-static'),
  app = express();

app.use(compression());

if (!process.env.EMBER_SERVER_APP_DIR) {
  throw new Error('No app directory found in environment');
}

app.use('/.well-known', serveStatic(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'assets/.well-known')));
app.use('/assets', serveStatic(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'assets')));
app.use('/bower_components', express.static(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'bower_components')));

if (process.env.EMBER_SERVER_FASTBOOT === 'true') {
  app.get('*', fastbootMiddleware(process.env.EMBER_SERVER_APP_DIR));
} else {
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'index.html'));
  });
}

https.createServer(ranger.cert, app).listen(process.env.EMBER_SERVER_HTTPS_PORT, () => {
  debug('Ember server started listening for HTTPS requests', { port: process.env.EMBER_SERVER_HTTPS_PORT });
});

http.createServer(app).listen(process.env.EMBER_SERVER_HTTP_PORT, () => {
  debug('Ember server started listening for HTTP requests', { port: process.env.EMBER_SERVER_HTTP_PORT });
});
