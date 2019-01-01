# ember-server

[![Codeship badge](https://codeship.com/projects/55dda650-f3c7-0134-0ba3-32e4a8253cde/status?branch=master)](https://app.codeship.com/projects/132772)
[![Code Climate](https://codeclimate.com/github/neotoma/ember-server/badges/gpa.svg)](https://codeclimate.com/github/neotoma/ember-server)
[![Code Climate issues badge](https://codeclimate.com/github/neotoma/ember-server/badges/issue_count.svg)](https://codeclimate.com/github/neotoma/ember-server/issues)
[![David badge](https://david-dm.org/neotoma/ember-server.svg)](https://david-dm.org/neotoma/ember-server)

This repository contains the source code for an Ember app server.

## Setup

The following environment variables are managed by [Park Ranger](https://github.com/markmhx/park-ranger):

- `EMBER_SERVER_HTTP_PORT`: Port through which to serve HTTP requests (e.g. `80`; required)
- `EMBER_SERVER_HTTPS_PORT`: Port through which to serve HTTPS requests (e.g. `80`; required)
- `EMBER_SERVER_APP_DIR`: System path to Ember app directory (e.g. `/var/www/my-ember-app`; required)

## Running the server

Once the environment is ready per above, and [Node.js](http://nodejs.org/) with [NPM](https://www.npmjs.com/) is installed, simply run `npm install` to install dependencies in the `node_modules` directory and `node index.js` to fire the server up.

## Developing and deploying the server

Deployment scripts are available through [Hoist](https://github.com/markmhx/grunt-hoist).