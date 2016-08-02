var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reload      = browserSync.reload;
const imagemin = require('gulp-imagemin');


var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('assets/scss/app.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("assets/scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('copyimg', function() {
    gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});
gulp.task('default', ['serve', 'copyimg'] );
