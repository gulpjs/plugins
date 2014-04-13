var gulp = require('gulp'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  ngmin = require('gulp-ngmin'),
  useref = require('gulp-useref'),
  filter = require('gulp-filter');

require('gulp-grunt')(gulp);

// Clean public
gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

// Build
gulp.task('default', ['clean', 'build']);

gulp.task('build', ['assets'], function () {

  var nonVendor = filter(['**/*.js','!bower_components']);
  var jsFilter = filter('**/*.js');
  var cssFilter = filter('**/*.css');

  return gulp.src('src/index.html')
    .pipe(useref.assets())
    .pipe(nonVendor)
    .pipe(ngmin())
    .pipe(nonVendor.restore())
    .pipe(jsFilter)
    // Minify js
    .pipe(uglify())
    .pipe(jsFilter.restore())
    // minify css
    .pipe(cssFilter)
    .pipe(minifyCss())
    .pipe(cssFilter.restore())
    // Bundle
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
  return gulp.src(['src/blackList.json', 'src/README.md'])
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.src('src/fonts/**/*'))
    .pipe(gulp.dest('dist/fonts'));
});

// Deploy
gulp.task('deploy', ['default'], function (cb) {
  gulp.run('grunt-gh-pages', cb);
});