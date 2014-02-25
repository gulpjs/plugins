'use strict';

angular.module('npm-plugin-browser')
    .value('blackList', {
      'gulp-browserify': 'use the browserify module directly',
      'gulp-requirejs': 'use the require.js module directly',
      'gulp-myth-css': 'duplicate of gulp-myth',
      'gulp-filesize': 'duplicate of gulp-size',
      'gulp-redust': 'duplicate of gulp-dust',
      'gulp-shell': 'duplicate of gulp-exec',
      'gulp-compile-js': 'combines other plugins',
      'gulp-module-system': 'does too much, use gulp-wrap-* modules',
      'gulp-wrap-define': 'duplicate of gulp-wrap-amd',
      'gulp-urequire': 'no documentation',
      'gulp-absolute': 'use gulp-filter and node\'s path module',
      'gulp-wintersmith': 'use the wintersmith module directly',
      'gulp-connect': 'use the connect module directly',
      'gulp-image-optimization': 'duplicate of gulp-imagemin',
      'gulp-bower': 'use the bower module directly',
      'gulp-ember-handlebars': 'duplicate of gulp-handlebars & too complex',
      'gulp-handlebars-michael': 'duplicate of gulp-handlebars',
      'gulpify': 'deprecated - use vinyl-source-stream instead'
    });
