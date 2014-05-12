var gulp = require('gulp'),
  rimraf = require('rimraf'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  ngmin = require('gulp-ngmin'),
  useref = require('gulp-useref'),
  deploy = require('gulp-gh-pages'),
  gif = require('gulp-if'),
  es = require('event-stream');

// Clean public
gulp.task('clean', function (cb) {
  rimraf('dist', cb);
});

// Build
gulp.task('default', ['clean', 'build']);

gulp.task('build', ['assets'], function () {

  var nonVendor = 'scripts/**/*.js';
  var jsFilter = '*.js';
  var cssFilter = '*.css';

  return gulp.src('src/index.html')
    .pipe(useref.assets())
    .pipe(gif(nonVendor, ngmin()))
    .pipe(gif(jsFilter, uglify()))
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