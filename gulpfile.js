var del          = require('del');
var run          = require('run-sequence');

var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var csslint      = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var base64       = require('gulp-base64');
var cleanCSS     = require('gulp-clean-css');
var size         = require('gulp-size');
var postcss      = require('gulp-postcss');
var sprites      = require('postcss-sprites').default;


// Clean up public folder

gulp.task('clean', function() {
  return del('public/*');
});


// Temp: copy

gulp.task('temp', function() {
  return gulp.src('resources/temp/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/temp/'))
  ;
});


// Content: copy

gulp.task('content', function() {
  return gulp.src('resources/content/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/content/'))
  ;
});


// Images: copy

gulp.task('images', function() {
  return gulp.src('resources/images/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/images/'))
  ;
});


// Markups: copy

gulp.task('markups', function() {
  return gulp.src('resources/markups/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/markups/'))
  ;
});


// Layouts: copy

gulp.task('layouts', function() {
  return gulp.src('resources/layouts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/layouts/'))
  ;
});


// Vendors: copy

gulp.task('vendors', function() {
  return gulp.src('resources/vendors/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/vendors/'))
  ;
});


// Scripts: copy

gulp.task('scripts', function() {
  return gulp.src('resources/scripts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/scripts/'))
  ;
});


// Styles: concat, add prefixes, compress, copy

gulp.task('styles', function() {

  var spritesOptions = {
    stylesheetPath: 'public/styles',
    spritePath: 'public/sprites',
    filterBy: function(image) {
      // Allow files from /sprites/ only
      if (!/\/sprites\//.test(image.url)) {
        return Promise.reject();
      }
      return Promise.resolve();
    }
  };

  var processors = [
    sprites(spritesOptions)
  ];

  return gulp.src([
    'resources/styles/style.css'
  ])
      .pipe(plumber())
      .pipe(cleanCSS({
        advanced: false,
        keepSpecialComments: 0
      }))
      .pipe(postcss(processors))
      .pipe(autoprefixer({
        browsers: 'last 2 versions',
        cascade: false
      }))
      .pipe(base64({
        // Allow files from /vectors/ only
        exclude: ['/sprite/', '/images/']
      }))
      .pipe(gulp.dest('public/styles/'))
      .pipe(size())
  ;
});


// lint

gulp.task('lint', function() {

  return gulp.src([
    '!resources/styles/style.css',
    'resources/styles/**/*.css'
  ])
      .pipe(plumber())
      .pipe(csslint('csslintrc.json'))
      .pipe(csslint.reporter())
      .pipe(csslint.reporter()) // random action just because css lint doesn't work in last row
  ;
});


gulp.task('default', function (fn) {
  run('clean', 'temp', 'content', 'images', 'markups', 'layouts', 'vendors', 'scripts', 'styles', 'lint', fn);
});



