'use strict';

angular.module('npm-plugin-browser')
    .value('blackList', {
      'gulp-browserify': 'use the browserify module directly',
      'gulp-requirejs': 'use the require.js module directly'
    });
