(function () {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var minify = require('gulp-minify-css');

    var files = [
        'site.css',
        'messages.css'
    ];

    gulp.task('app-css', function () {

        return gulp.src(files, { cwd: './public/css'})
            .pipe(concat('app.css'))
            .pipe(minify())
            .pipe(gulp.dest('./public/dist/css/'));
    });


})();
