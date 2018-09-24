var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var gulpCopy = require('gulp-copy');
var clean = require('gulp-rimraf');

gulp.task('connect', function() {
    connect.server();
});

gulp.task('generateHtml', function(){

  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build/'))
});

gulp.task('sass', function(){

  gulp.src('./src/scss/style.scss')
    .pipe(sass({
      // pretty: true
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./build/css'))
});
gulp.task('generateJs', function(){

  gulp.src('./src/js/**.*')
    .pipe(gulp.dest('./build/js'))
});

gulp.task('generateData', function(){

  gulp.src('./src/data/**.*')
    .pipe(gulp.dest('./build/data'))
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('re-loaded', function() {
    browserSync.reload()
});

gulp.task('watch', function(){
    gulp.watch('src/js/**.*', ['re-loaded', 'cleanJs', 'generateJs']);
    gulp.watch('src/data/**.*', ['re-loaded', 'cleanData', 'generateData']);
    gulp.watch('src/scss/*.scss', ['re-loaded', 'cleanCss', 'sass']);
    gulp.watch('src/*.html', ['re-loaded', 'cleanHtml', 'generateHtml']);
});

gulp.task('cleanJs', function() {
  return gulp.src("build/js/**.*", { read: false }).pipe(clean());
});
gulp.task('cleanData', function() {
  return gulp.src("build/data/**.*", { read: false }).pipe(clean());
});
gulp.task('cleanCss', function() {
  return gulp.src("build/css/*", { read: false }).pipe(clean());
});
gulp.task('cleanHtml', function() {
  return gulp.src("build/**.html", { read: false }).pipe(clean());
});


gulp.task('default', ['generateHtml', 'generateData', 'generateJs', 'browser-sync', 'sass', 'watch', 'connect'], function(){
});
