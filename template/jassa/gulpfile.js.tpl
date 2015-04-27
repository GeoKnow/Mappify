'use strict';

var $ = require('gulp-stack').plugins;

var staticFiles = [
    {
        name: 'jassa',
        folder: 'dist/bower_components/jassa',
        src: 'bower_components/jassa/*.min.js'
    }
]

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
        bower: 'app/bower_components/**', // String of bower directory string
    }
);


/**
 * Alias Tasks
 */

gulp.newTask('default', ['build']);
gulp.newTask('test',    ['jshint']);
gulp.newTask('build',   ['html', 'app', 'static', 'vendor']);

gulp.task('dev', ['develop']);





