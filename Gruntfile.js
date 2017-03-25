/**
 * Configure Grunt scripts
 * @module
 */

var env = process.env.EMBER_SERVER_ENV;

require('dotenvs')(env);
var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    deployFiles: {
      options: {
        destDir: process.env.EMBER_SERVER_DEPLOY_DIR,
        destHost: process.env.EMBER_SERVER_DEPLOY_USER + '@' + process.env.EMBER_SERVER_DEPLOY_HOST,
        srcDir: __dirname
      }
    }
  });

  loadGruntTasks(grunt);

  grunt.registerTask('deploy', 'Deploy server to host', [
    `deploy-files:.env-${env}-deploy:.env-${env}`,
    'deploy-files:index.js',
    'deploy-files:package.json'
  ]);
};