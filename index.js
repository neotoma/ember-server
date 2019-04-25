/**
 * Initialize HTTP and HTTPS servers for Ember app
 */

var ranger = require('park-ranger')();

var compression = require('compression'),
  cors = require('cors'),
  debug = require('debug')('ember-server'),
  express = require('express'),
  fastbootMiddleware = require('fastboot-express-middleware'),
  http = require('http'),
  https = require('https'),
  path = require('path'),
  serveStatic = require('serve-static'),
  app = express();

let httpsPort = process.env.EMBER_SERVER_HTTPS_PORT ? process.env.EMBER_SERVER_HTTPS_PORT : 8124;
let httpPort = process.env.EMBER_SERVER_HTTP_PORT ? process.env.EMBER_SERVER_HTTP_PORT : 8123;

app.use(compression());
app.use(cors());

if (!process.env.EMBER_SERVER_APP_DIR) {
  throw new Error('No app directory found in environment');
}

['.well-known', 'assets', 'bower_components', 'images', 'manifest.json'].forEach((directory) => {
  app.use(`/${directory}`, serveStatic(path.resolve(process.env.EMBER_SERVER_APP_DIR, `${directory}`)));
});

/**
 * Redirect all HTTP requests to HTTPS
 */
app.use(function(req, res, next) {
  if (req.secure) {
    next();
  } else {
    // Change port if host includes one explicitly
    if (req.headers.host.includes(':')) {
      res.redirect(`https://${req.headers.host.substr(0, req.headers.host.indexOf(':'))}:${httpsPort}${req.url}`);
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  }
});

if (process.env.EMBER_SERVER_FASTBOOT === 'true') {
  app.get('*', fastbootMiddleware(process.env.EMBER_SERVER_APP_DIR));
} else {
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(process.env.EMBER_SERVER_APP_DIR, 'index.html'));
  });
}

if (ranger.cert) {
  https.createServer(ranger.cert, app).listen(httpsPort, () => {
    debug('Ember server started listening for HTTPS requests', { port: httpsPort});
  });
}

http.createServer(app).listen(httpPort, () => {
  debug('Ember server started listening for HTTP requests', { port: httpPort });
});