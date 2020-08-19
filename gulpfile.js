/**
 * Created by chentsu on 25.06.2017.
 */

'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const sourceMaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function () {
  return gulp.src('./styles/**')
    .pipe(less())
    .pipe(gulp.dest('./site/styles'));
});
gulp.task('html', function () {
  return gulp.src('./index.html').pipe(gulp.dest('./site'));
});
gulp.task('bs', function () {
  browserSync.init({
    server: './site'
  });
  browserSync.watch('./site/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function () {
  gulp.watch('./styles/**/*.*', gulp.series('styles'));
  gulp.watch('./index.html', gulp.series('html'));
});

gulp.task('default', function () {
  gulp.parallel('watch', 'bs')
});