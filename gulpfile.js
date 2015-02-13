'use strict';

var _ = require('lodash');

var $ = require('gulp-stack').plugins;

$.bower = require('gulp-bower');
$.flatten = require('gulp-flatten');
$.less = require('gulp-less');
$.yaml = require('gulp-yaml');

var staticFiles = [
    {
        name: 'fonts',
        folder: 'dist/fonts',
        src: '$vendor',
        filter: ['{f,F}ont*.{otf,eot,svg,ttf,woff}']
    },
    {
        name: 'images',
        folder: 'dist/images',
        src: ['app/images/*', '**/leaflet/dist/images/**'],
        pipe: $.lazypipe().pipe($.flatten).pipe($.imagemin)
    }
];

var gulp = require('gulp-stack').gulp([
        'clean',
        'app',
        'vendor',
        'static',
        'develop',
        'html'
    ],
    {
        files: {
            static: staticFiles
        },
        injectInto: {
            css: {
                pre: mainLess
            }
        },
        bower: 'app/bower_components/**', // String of bower directory string
        templateCacheOptions: {root: '/', module: 'easyagent'}
    }
);

/**
 * Alias Tasks
 */

gulp.newTask('default', ['build', 'jshint']);

gulp.newTask('test', ['jshint']);

gulp.newTask('build', ['html', 'app', 'static', 'vendor']);

gulp.task('dev', ['bower','dev.fonts', 'develop', 'watch.less']);

gulp.task('dev.fonts', ['bower'], function () {

    return gulp.src(gulp.options.files.vendor)
        .pipe($.filter(['{f,F}ont*.{otf,eot,svg,ttf,woff}']))
        .pipe(gulp.dest('.tmp/fonts'));

});

gulp.task('less', function () {
    mainLess().pipe(gulp.dest('app/styles/'));
});

/**
 * WATCH TASKS
 */

gulp.task('watch.less', ['less'], function () {
    $.watch('app/**/*.less', function () {
        gulp.start('less');
    })
});

/**
 * BOWER TASKS
 */

gulp.task('bower', ['bower.writeConfig'], function () {
    return $.bower();
});

gulp.task('bower.writeConfig', function () {
    return gulp.src('./bower.yml')
        .pipe($.yaml({space: 2}))
        .pipe(gulp.dest('./'));
});

/** SRC FUNCTIONS */

function mainLess() {
    return gulp.src('app/styles/app.less')
        .pipe($.less())
}