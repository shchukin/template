var del          = require('del');

var gulp         = require('gulp');
var csslint      = require('gulp-csslint');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var base64       = require('gulp-base64');
var cleanCSS     = require('gulp-clean-css');
var size         = require('gulp-size');

var postcss      = require('gulp-postcss');
var sprites      = require('postcss-sprites').default;


// Clean up public folder
// It is separated task which is not included in default task
// Run it as a "gulp clean" before "gulp"

gulp.task('clean', function() {
  del('public/*');
});


// Temp: copy

gulp.task('temp', function() {
  gulp.src('resources/temp/**/*')
      .pipe(gulp.dest('public/temp/'))
  ;
});


// Content: copy

gulp.task('content', function() {
  gulp.src('resources/content/**/*')
      .pipe(gulp.dest('public/content/'))
  ;
});


// Images: copy

gulp.task('images', function() {
  gulp.src('resources/images/**/*')
      .pipe(gulp.dest('public/images/'))
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


// Vendors: copy

gulp.task('vendors', function() {
  gulp.src('resources/vendors/**/*')
      .pipe(gulp.dest('public/vendors/'))
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

  gulp.src([
    'resources/vendor/normalize/normalize.css',
    'resources/styles/fonts.css',
    'resources/styles/keyframes.css',
    'resources/styles/init.css',
    '!resources/styles/style.css',
    'resources/styles/**/*.css'
  ])
      .pipe(csslint('csslintrc.json'))
      .pipe(csslint.reporter())
      .pipe(concat('style.css'))
      .pipe(postcss(processors))
      .pipe(autoprefixer({
        browsers: 'last 2 versions',
        cascade: false
      }))
      .pipe(base64({
        // Allow files from /vectors/ only
        exclude: ['/sprite/', '/images/']
      }))
      .pipe(cleanCSS({
        advanced: false,
        keepSpecialComments: 0
      }))
      .pipe(gulp.dest('public/styles/'))
      .pipe(size())
  ;
});


// lint

gulp.task('lint', function() {

  gulp.src([
    '!resources/styles/style.css',
    'resources/styles/**/*.css'
  ])
      .pipe(csslint('csslintrc.json'))
      .pipe(csslint.reporter())
      .pipe(concat('style.css')) // random action just because css lint doesn't work in last row
  ;
});

gulp.task('default', ['temp', 'content', 'images', 'markups', 'layouts', 'vendors', 'scripts', 'styles', 'lint']);





