var gulp = require('gulp'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  ngmin = require('gulp-ngmin'),
  useref = require('gulp-useref'),
  deploy = require('gulp-gh-pages'),
  gif = require('gulp-if'),
  es = require('event-stream'),
  saveLicense = require('uglify-save-license');

// Clean public
gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

// Build
gulp.task('default', ['clean', 'build']);

gulp.task('build', ['assets'], function () {

  var nonVendor = '**/app.js';
  var jsFilter = '**/*.js';
  var cssFilter = '**/*.css';

  return gulp.src('src/index.html')
    .pipe(useref.assets())
    .pipe(gif(nonVendor, ngmin()))
    .pipe(gif(jsFilter, uglify({preserveComments: saveLicense})))
    .pipe(gif(cssFilter, minifyCss()))
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {

  var statics = gulp.src(['src/blackList.json', 'src/README.md'])
    .pipe(gulp.dest('dist/'));

  var fonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  return es.concat(statics, fonts);

});

// Deploy
gulp.task('deploy', ['default'], function () {
  gulp.src("./dist/**/*")
    .pipe(deploy('git@github.com:gulpjs/plugins.git'));
});