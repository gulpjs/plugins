var gulp = require('gulp');
var clean = require('gulp-clean');
var brunch = require('brunch');
var runseq = require('run-sequence');
require('gulp-grunt')(gulp);

// Clean public
gulp.task('clean', function () {
  return gulp.src('public/', {read: false})
    .pipe(clean());
});

// Push using grunt-gh-pages
gulp.task('gh-pages', function (cb) {
  gulp.run('grunt-gh-pages', cb);
});

// brunch build --production
gulp.task('build:prod', function (cb) {
  brunch.build({production: true}, function () {
    cb();
  });
});

// Deploy
gulp.task('deploy', function (cb) {
  // ugly hack to run in sequence
  runseq(
    'clean',
    'build:prod',
    'gh-pages',
    cb);
});

// Simple dev task, brunch watch --server
gulp.task('dev', function (cb) {
  // another ugly hack
  runseq(
    'clean',
    function () {
      brunch.watch({server: true});
    }
  );
});