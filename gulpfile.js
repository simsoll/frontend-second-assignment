'use strict';

var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var csso = require('gulp-csso');
var declare = require('gulp-declare');
var eslint = require('gulp-eslint');
var gulpif = require('gulp-if');
var handlebars = require('gulp-handlebars');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var taskListing = require('gulp-task-listing');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var wrap = require('gulp-wrap');

var config = require('./gulpconfig')();
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var path = require('path');
var series = require('stream-series');

var browserSync = require('browser-sync');

gulp.task('help', taskListing);
gulp.task('default', ['help']);

gulp.task('lint', function () {
    return gulp.src(config.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('styles', ['clean-css'], function () {
    return gulp.src(config.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.clientCss));
});

gulp.task('fonts', ['clean-fonts'], function () {
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function () {
    return gulp.src(config.images)
        .pipe(imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.build + 'images'));
})

gulp.task('clean', function () {
    var files = [].concat(config.build);
    return gulp.src(files, { read: false })
        .pipe(clean());
});

gulp.task('clean-vendor', function () {
    return gulp.src(config.vendor, { read: false })
        .pipe(clean());
});

gulp.task('clean-fonts', function () {
    var files = config.fonts;
    return gulp.src(files, { read: false })
        .pipe(clean());
});

gulp.task('clean-images', function () {
    var files = config.images;
    return gulp.src(files, { read: false })
        .pipe(clean());
});

gulp.task('clean-css', function () {
    return gulp.src(config.clientCss, { read: false })
        .pipe(clean());
});

gulp.task('bower-to-vendor', ['clean-vendor'], function () {
    return gulp.src(mainBowerFiles(), { base: './bower_components' })
        .pipe(gulp.dest(config.vendor));
});

gulp.task('inject-js', ['bower-to-vendor'], function () {
    var jsVendor = gulp.src(config.jsVendor, { read: false });
    var app = gulp.src(config.jsApp, { read: false });

    return gulp.src(config.index)
        .pipe(inject(series(jsVendor, app)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject-css', ['bower-to-vendor'], function () {
    var css = gulp.src(config.cssApp, { read: false });
    var cssFonts = gulp.src('./public/fonts/*.css', { read: false });
    var cssVendor = gulp.src(config.cssVendor, { read: false });

    return gulp.src(config.index)
        .pipe(inject(series(css, cssFonts, cssVendor)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['inject-css', 'inject-js']);

gulp.task('optimize', ['inject', 'fonts', 'images'], function () {
    return gulp.src(config.index)
        .pipe(plumber())
        .pipe(useref({ searchPath: './' }))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest(config.build));
});

gulp.task('browserSync', function () {
    browserSync({
        browser: config.browserSync.browsers,
        files: config.browserSync.files,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        port: config.browserSync.port,
        server: {
            baseDir: config.root
        },
        startPath: config.index
    });
});

gulp.task('dev', ['browserSync'], function () {
    gulp.watch(config.styles, ['styles']);
})