var del          = require('del');
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');



// Clean up public folder
// It is separated task which is not inluded in pipeline
// Run it as a "gulp clean" before "gulp"

gulp.task('clean', function() {
  del('public/*');
});


// Content: copy

gulp.task('content', function() {
  gulp.src('resources/content/**/*')
      .pipe(gulp.dest('public/content/'))
  ;
});


// Vendors: copy

gulp.task('vendors', function() {
  gulp.src('resources/vendors/**/*')
      .pipe(gulp.dest('public/vendors/'))
  ;
});


// Markups: copy

gulp.task('markups', function() {
  gulp.src('resources/markups/**/*')
      .pipe(gulp.dest('public/markups/'))
  ;
});


// Layouts: copy

gulp.task('layouts', function() {
  gulp.src('resources/layouts/**/*')
      .pipe(gulp.dest('public/layouts/'))
  ;
});


// Images: copy

gulp.task('images', function() {
  gulp.src('resources/images/**/*')
      .pipe(gulp.dest('public/images/'))
  ;
});


// Scripts: copy

gulp.task('scripts', function() {
  gulp.src('resources/scripts/**/*')
      .pipe(gulp.dest('public/scripts/'))
  ;
});


// Styles: concat, add prefixes, compress, copy

gulp.task('styles', function() {
  gulp.src([
    'resources/styles/fonts.css',
    'resources/vendors/normalize/normalize.css',
    'resources/styles/init.css',
    '!resources/styles/style.css',
    'resources/styles/**/*.css'
  ])
      .pipe(concat('style.css'))
      .pipe(autoprefixer({
        browsers: 'last 2 versions',
        cascade: false
      }))
      .pipe(cleanCSS({
        advanced: false,
        keepSpecialComments: 0
      }))
      .pipe(gulp.dest('public/styles/'))
  ;
});

gulp.task('default', ['content', 'vendors', 'markups', 'layouts', 'images', 'scripts', 'styles']);





