(function() {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

    var files = [
        './app/namespace.js',
        './app/app.js',
        './app/config.js',
        './app/map/**/*.js',
        './app/common/**/*.js',
        './app/directives/**/*.js',
        './app/filters/**/*.js',
        './app/model/**/*.js',
        './app/store/**/*.js',
        './app/proxies/**/*.js',
        './app/services/**/*.js',
        './app/controllers/**/*.js'
    ];

    gulp.task('app-js', function() {

        return gulp.src(files)
            .pipe(concat('app.js'))
            //.pipe(uglify())
            .pipe(gulp.dest('./public/dist/js/'));

    });

})();
