var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reload      = browserSync.reload;
const imagemin = require('gulp-imagemin');
var watchify     = require('watchify');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var gutil        = require('gulp-util');
var uglify       = require('gulp-uglify');
var streamify    = require('gulp-streamify');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var babel        = require('gulp-babel');
var prod         = gutil.env.prod;
var gulpSequence = require('gulp-sequence');

var onError = function(err) {
    console.log(err.message);
    this.emit('end');
};

var config = {
    sassPath: './assets/scss',
    bowerDir: './assets/vendor'
}

gulp.task('sass', function() {
  return gulp.src('assets/scss/app.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({match: '**/*.css'}))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./dist/fonts'))
});
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("assets/scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload)

});

gulp.task('copyimg', function() {
    gulp.src('assets/img/**/*.{gif,jpg,png}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
        }))
        .pipe(gulp.dest('dist/img/'));
});

// bundling js with browserify and watchify
var b = watchify(browserify('assets/js/**/*.js', {
    cache: {},
    packageCache: {},
    fullPaths: true
}));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
    return b.bundle()
        .on('error', onError)
        .pipe(source('assets/js/**/*.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(prod ? streamify(uglify()) : gutil.noop())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream())
}

gulp.task('default', gulpSequence(['copyimg','icons','sass', 'js'], 'serve'));
