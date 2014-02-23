'use strict';

angular.module('npm-plugin-browser')
    .value('blackList', {
      'gulp-browserify': 'use the browserify module directly',
      'gulp-requirejs': 'use the require.js module directly',
      'gulp-myth-css': 'duplicate of gulp-myth',
      'gulp-filesize': 'duplicate of gulp-size',
      'gulp-redust': 'duplicate of gulp-dust',
      'gulp-shell': 'duplicate of gulp-exec'
    });
