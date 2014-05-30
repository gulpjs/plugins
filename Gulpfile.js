var gulp = require('gulp'),
  rimraf = require('rimraf'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  ngmin = require('gulp-ngmin'),
  useref = require('gulp-useref'),
  deploy = require('gulp-gh-pages'),
  gif = require('gulp-if'),
  es = require('event-stream'),
  saveLicense = require('uglify-save-license');

// Clean public
gulp.task('clean', function (cb) {
  rimraf('dist', cb);
});

// Build
gulp.task('default', ['build', 'assets']);

gulp.task('watch', function(){
  gulp.watch('src/**/*', ['build', 'assets']);
});

gulp.task('build', ['clean'], function () {
  var nonVendor = 'scripts/**/*.js';
  return gulp.src('src/index.html')
    .pipe(useref.assets())
    .pipe(gif(nonVendor, ngmin()))
    .pipe(gif('*.js', uglify({
      mangle: false,
      preserveComments: saveLicense
    })))
    .pipe(gif('*.css', minifyCss()))
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', ['clean'], function () {

  var statics = gulp.src([
    'src/blackList.json',
    'src/favicon.ico',
    'src/README.md'
  ]).pipe(gulp.dest('dist/'));

  var fonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  return es.merge(statics, fonts);

});

// Deploy
gulp.task('deploy', ['default'], function () {
  return gulp.src('dist/**/*')
    .pipe(deploy('git@github.com:gulpjs/plugins.git'));
});