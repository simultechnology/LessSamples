var gulp = require('gulp');
var webserver = require('gulp-webserver');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  gulp.src(['src/scripts/**.js'])
    .pipe(concat('script.js'))
    //.pipe(sourcemaps.init())
    .pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch', function() {

  gulp.watch('src/styles/**', ['styles']);
  gulp.watch('src/scripts/**', ['scripts']);
  gulp.watch('src/images/**', ['copy']);
  gulp.watch('src/*.html', ['copy']);
});

gulp.task('copy', ['styles', 'scripts'], function() {
  gulp.src('src/images/**').pipe(gulp.dest('dist/images'));
  return gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  gulp.src(['src/styles/main.less'])
    //.pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCss())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('webserver', ['watch'], function() {
  gulp.src('dist')
    .pipe(webserver({
      port: 18888,
      livereload: true,
      directoryListing: {
        enable: true,
        path: 'dist'
      },
      open: true
    }));
});

gulp.task('default', ['copy', 'watch', 'webserver']);
