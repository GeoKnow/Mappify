'use strict';

var _ = require('lodash');

var $ = require('gulp-stack').plugins;

$.bower = require('gulp-bower');
$.download = require('gulp-download');
$.flatten = require('gulp-flatten');
$.rename = require('gulp-rename');
$.replace = require('gulp-replace');
$.less = require('gulp-less');
$.yaml = require('gulp-yaml');

var staticFiles = [
    {
        name: 'jassa',
        folder: 'dist/bower_components/jassa',
        src: 'app/bower_components/jassa/*.min.js'
    },
    {
        name: 'fonts',
        folder: 'dist/fonts',
        src: '$vendor',
        filter: ['{f,F}ont*.{otf,eot,svg,ttf,woff,woff2}']
    },
    {
        name: 'images',
        folder: 'dist/images',
        src: ['app/images/*', '**/leaflet/dist/images/**','**/*awesome-markers/dist/images/**'],
        pipe: $.lazypipe().pipe($.flatten).pipe($.imagemin)
    },
    {
        name: 'data jsons',
        folder: 'dist/data',
        src: 'data/*'
    },
    {
        name: 'data template',
        folder: 'dist/template',
        src: 'template/**/*'
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
                pre: mainLess,
                post: leafletMarkerCSS
            }
        },
        bower: 'app/bower_components/**', // String of bower directory string
        templateCacheOptions: {root: '/', module: 'mappifyApp'}
    }
);

/**
 * Alias Tasks
 */

gulp.newTask('default', ['build' /*, 'jshint'*/]);

gulp.newTask('test', [/*'jshint'*/]);

gulp.newTask('build', ['html', 'app', 'static', 'vendor']);

gulp.task('dev', ['bower','dev.fonts', 'develop', 'watch.less']);

gulp.task('dev.fonts', ['bower'], function () {

    return gulp.src(gulp.options.files.vendor)
        .pipe($.filter(['{f,F}ont*.{otf,eot,svg,ttf,woff2}']))
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
        .pipe($.less());
}

function leafletMarkerCSS(){
    return gulp.src([ '**/leaflet/dist/*.css','**/*awesome-markers/dist/*.css'])
        .pipe($.replace(/\(('?)images/g,'($1../images'))
        .pipe($.flatten())
        .pipe($.concat('leaflet.css'))
}


gulp.task('generateIconJSON', function () {
    return $.download('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/src/icons.yml')
        .pipe($.yaml({safe: true, space: 2}))
        .pipe($.rename('markerStyle.json'))
        .pipe(gulp.dest('data'));
});
