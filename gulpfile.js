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


// Clean up production folder

gulp.task('clean', function() {
  return del('production/*');
});


// Temp: copy

gulp.task('temp', function() {
  return gulp.src('development/temp/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('production/temp/'))
  ;
});


// Content: copy

gulp.task('content', function() {
  return gulp.src('development/content/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('production/content/'))
  ;
});


// Images: copy

gulp.task('images', function() {
  return gulp.src('development/images/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('production/images/'))
  ;
});


// Markups: copy

gulp.task('markups', function() {
  return gulp.src('development/markups/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('production/markups/'))
  ;
});


// Layouts: copy

gulp.task('layouts', function() {
  return gulp.src('development/layouts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('production/layouts/'))
  ;
});


// Vendors: copy

gulp.task('vendors', function() {
  return gulp.src('development/vendors/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('production/vendors/'))
  ;
});


// Scripts: copy

gulp.task('scripts', function() {
  return gulp.src('development/scripts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('production/scripts/'))
  ;
});


// Styles: concat, add prefixes, compress, copy

gulp.task('styles', function() {

  var spritesOptions = {
    stylesheetPath: 'production/styles',
    spritePath: 'production/sprites',
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
    'development/styles/style.css'
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
      .pipe(gulp.dest('production/styles/'))
      .pipe(size())
  ;
});


// lint

gulp.task('lint', function() {

  return gulp.src([
    '!development/styles/style.css',
    'development/styles/**/*.css'
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



