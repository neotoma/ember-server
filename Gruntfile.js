/**
 * Configure Grunt scripts
 * @module
 */

require('park-ranger')();
var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig();

  loadGruntTasks(grunt);
};