'use strict';

var gulp = require('gulp');

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
var taskListing = require('gulp-task-listing');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var wrap = require('gulp-wrap');

var config = require('./gulp.config')();
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var path = require('path');
var series = require('stream-series');

var browserSync = require('browser-sync');

gulp.task('help', taskListing);
gulp.task('default', ['help']);

gulp.task('lint', function() {
    return gulp.src(config.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('fonts', ['clean-fonts'], function() {
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
    return gulp.src(config.images)
        .pipe(imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.build + 'images'));
})

gulp.task('clean', function() {
    var files = [].concat(config.build);
    return gulp.src(files, { read: false })
        .pipe(clean());
});

gulp.task('clean-vendor-files', function() {
    return gulp.src(config.vendor, { read: false })
        .pipe(clean());
});

gulp.task('clean-fonts', function() {
    var files = config.build + 'fonts/**/*.*';
    return gulp.src(files, { read: false })
        .pipe(clean());
});

gulp.task('clean-images', function() {
    var files = config.build + 'images/**/*.*';
    return gulp.src(files, { read: false })
        .pipe(clean());
});

gulp.task('bower-to-vendor', ['clean-vendor-files'], function() {
    return gulp.src(mainBowerFiles(), { base: './bower_components' })
        .pipe(gulp.dest(config.vendor));
});

gulp.task('inject-js', ['templates', 'bower-to-vendor'], function() {
    var jsVendor = gulp.src(config.jsVendor, { read: false });
    var app = gulp.src(config.jsApp, { read: false });
    var components = gulp.src(config.jsComponents, { read: false });
    var templates = gulp.src(config.jsTemplates, { read: false });
    var modules = gulp.src(config.jsModules, { read: false });

    return gulp.src(config.index)
        .pipe(inject(series(jsVendor, templates, modules, components, app)))
        .pipe(gulp.dest(config.layouts));
});

gulp.task('inject-css', ['bower-to-vendor'], function() {
    var css = gulp.src(config.css, { read: false });
    var cssFonts = gulp.src('./public/fonts/*.css', { read: false });
    var cssVendor = gulp.src(config.cssVendor, { read: false });

    return gulp.src(config.index)
        .pipe(inject(series(css, cssFonts, cssVendor)))
        .pipe(gulp.dest(config.layouts));
});

gulp.task('inject', ['inject-css', 'inject-js']);

gulp.task('optimize', ['inject', 'fonts', 'images'], function() {
    return gulp.src(config.index)
        .pipe(plumber())
        .pipe(useref({ searchPath: './' }))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest(config.build));
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('dev', ['inject', 'lint'], function() {
    gulp.watch(config.css, ['bs-reload']);
    gulp.watch(config.js, ['bs-reload']);
    gulp.watch(config.jsHandlebarsTemplates, ['templates']);
    gulp.watch(config.jsHandlebarsPartials, ['templates']);

    var files = [
        config.index,
        config.js,
        config.css
    ];

    browserSync.init({
        server: {
            baseDir: [].concat(['./'], config.client)
        },
        files: files
    });
});

gulp.task('serve-dev', ['inject', 'lint'], function() {
    var options = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: [].concat('public/', 'sass/')
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting...');
        });
});