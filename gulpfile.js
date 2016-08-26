var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reload = browserSync.reload;
const imagemin = require('gulp-imagemin');
var watchify = require('watchify');
//var browserify   = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var prod = gutil.env.prod;
var gulpSequence = require('gulp-sequence');
var elixir = require('laravel-elixir');

require('laravel-elixir-vueify');
gulp.task('js', function () {
    elixir(function (mix) {
        mix.browserify('./scripts/app.js', 'dest/js/bundle.js');
    });
});


var onError = function (err) {
    console.log(err.message);
    this.emit('end');
};

var config = {
    sassPath: './styles',
    bowerDir: './vendor'
}


gulp.task('sass', function () {
    return gulp.src(config.sassPath + '/app.scss')
        .pipe($.sass()
            .on('error', $.sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('./dest/css'))
        .pipe(browserSync.stream({match: '**/*.css'}))
});

gulp.task('icons', function () {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./dest/fonts'))
});
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./styles/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload)

});

gulp.task('copyimg', function () {
    gulp.src('./images/**/*.{gif,jpg,png}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}, {removeUselessStrokeAndFill: false}]
        }))
        .pipe(gulp.dest('./dest/images/'));
});


// bundling js with browserify and watchify
gulp.task('build', ['js', 'icons', 'sass', 'copyimg']);

gulp.task('default', gulpSequence('build', 'serve'));
