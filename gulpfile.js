var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
//var reload = browserSync.reload;
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
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var filesExist = require('files-exist');
var gulpSequence = require('gulp-sequence');
var elixir = require('laravel-elixir');
var env  = gutil.env.env || 'local';

require('laravel-elixir-vueify');

gulp.task('watch', ['sass'] ,function () {

    elixir.config.js.browserify.watchify.options.poll = true;
    elixir.config.js.browserify.options.debug = true;

    if (gutil.env._.indexOf('watch') > -1) {
        //  Add the browserify HMR plugin
        elixir.config.js.browserify.plugins.push({
            name: 'browserify-hmr',
            options: {}
        })
    }
    //  Add the browserify HMR plugin
    elixir(function (mix) {
        mix.browserify('./app/app.js', 'dist/js/bundle.js');
        browserSync.init({
            server: "./dist"
        });
    });

    gulp.watch("./app/styles/**/*.scss", ['sass']);
});

var jsConf = [
    './config/config.'+env+'.js'
];

gulp.task('js', function () {
    elixir(function (mix) {
        mix.browserify('./app/app.js', 'dist/js/bundle.js');
    });
});

var onError = function (err) {
    console.log(err.message);
    this.emit('end');
};

var config = {
    sassPath: './app/styles',
    bowerDir: './vendor'
};

gulp.task('sass', function () {
    return gulp.src(config.sassPath + '/app.scss')
        .pipe($.sass()
            .on('error', $.sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream({match: '**/*.css'}))
});

gulp.task('icons', function () {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('config', function () {

    return gulp.src(filesExist(jsConf, { exceptionMessage: 'The environment specified has no config file' }))
        .pipe(rename('config.js'))
        .pipe(gulp.dest('./config'));

});

// Static Server + watching scss/html files
gulp.task('serve', ['config'], function () {

    browserSync.init({
        server: "./dist"
    });

});

gulp.task('copyimg', function () {
    gulp.src('./app/images/**/*.{gif,jpg,png}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}, {removeUselessStrokeAndFill: false}]
        }))
        .pipe(gulp.dest('./dist/images/'));
});

// bundling js with browserify and watchify
gulp.task('default', gulpSequence('config','js', 'icons', 'sass', 'copyimg'));
