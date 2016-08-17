/*var gulp        = require('gulp');
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
    sassPath: './styles',
    bowerDir: './vendor'
}

gulp.task('sass', function() {
  return gulp.src(config.sassPath + '/app.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./dest/css'))
    .pipe(browserSync.stream({match: '**//*.css'}))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./dest/fonts'))
});
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./styles/**//*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload)

});



// bundling js with browserify and watchify
var b = watchify(browserify('./scripts/app.js', {
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
        .pipe(source('./scripts/**//*.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(prod ? streamify(uglify()) : gutil.noop())
        .pipe(gulp.dest('./dest/scripts'))
        .pipe(browserSync.stream())
}

gulp.task('default', gulpSequence(['copyimg','icons','sass', 'js'], 'serve'));*/

var gulp = require('gulp');
var $           = require('gulp-load-plugins')();
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();



var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reload      = browserSync.reload;
const imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var connect = require('gulp-connect');
var copy = require('gulp-copy');
var gulpSequence = require('gulp-sequence');
const plugins = require('./bs-config').plugins;
var url = require('url'); // https://www.npmjs.org/package/url
var proxyMiddleware = require('http-proxy-middleware');// https://www.npmjs.org/package/proxy-middleware
var browserSync = require('browser-sync'); // https://www.npmjs.org/package/browser-sync


gulp.task('browser-sync', function() {



    browserSync({
        open: true,
        port: 3000,
        server: {
            baseDir: "./"

        }
    });
    gulp.watch("./styles/**//*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload)

});
// Run webpack
gulp.task('webpack', function(){
  return gulp.src('src/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dest/js/'))
    .pipe(connect.reload());
});



// Copy index.html file
gulp.task('build.index', function(){
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dest'));
});

gulp.task('copyimg', function() {
   gulp.src('./images/**//*.{gif,jpg,png}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
        }))
        .pipe(gulp.dest('dest/images/'));
});

var onError = function(err) {
    console.log(err.message);
    this.emit('end');
};

var config = {
    sassPath: './styles',
    bowerDir: './vendor'
}

gulp.task('sass', function() {
  return gulp.src(config.sassPath + '/app.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./dest/css'))
    .pipe(browserSync.stream({match: '**//*.css'}))
});



// Default task
gulp.task('default', gulpSequence(['copyimg','webpack','browser-sync', 'sass','build.index']));
