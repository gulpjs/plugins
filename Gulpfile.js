var gulp = require('gulp'),
  rimraf = require('rimraf'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  ngmin = require('gulp-ngmin'),
  useref = require('gulp-useref'),
  deploy = require('gulp-gh-pages'),
  gif = require('gulp-if'),
  es = require('event-stream'),
  lr = require('gulp-refresh'),
  autoprefixer = require('gulp-autoprefixer'),
  saveLicense = require('uglify-save-license');

// Clean public
gulp.task('clean', function (cb) {
  rimraf('dist', cb);
});

// Build
gulp.task('default', ['build', 'assets']);
gulp.task('dev', ['default', 'watch']);

gulp.task('watch', function(){
  gulp.watch('src/**/*', ['build', 'assets']);
});

gulp.task('build', ['clean'], function () {
  var nonVendor = 'scripts/**/*.js';
  var assets = useref.assets();

  return gulp.src('src/index.html')
    .pipe(assets)
    .pipe(gif(nonVendor, ngmin()))
    /*.pipe(gif('*.js', uglify({
      mangle: false,
      preserveComments: saveLicense
    })))*/
    .pipe(gif('*.css', autoprefixer('last 2 versions')))
    .pipe(gif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
    .pipe(lr());
});

gulp.task('assets', ['clean'], function () {
  return gulp.src([
    'src/blackList.json',
    'src/favicon.ico',
    'src/logo.svg',
    'src/opensearch.xml',
    'src/README.md'
  ], {base: 'src'})
    .pipe(gulp.dest('dist'))
    .pipe(lr());
});

// Deploy
gulp.task('deploy', ['default'], function () {
  return gulp.src('dist/**/*')
    .pipe(deploy('git@github.com:gulpjs/plugins.git'));
});
