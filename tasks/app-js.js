(function() {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

    var files = [
        'namespace.js',
        'app.js',
        'config.js',
        'routes.js',
        'map/**/*.js',
        'common/**/*.js',
        'directives/**/*.js',
        'filters/**/*.js',
        'model/**/*.js',
        'store/**/*.js',
        'proxies/**/*.js',
        'services/**/*.js',
        'controllers/**/*.js'
    ];

    gulp.task('app-js', function() {

        return gulp.src(files, { cwd: './public/app' })
            .pipe(concat('app.js'))
            //.pipe(uglify())
            .pipe(gulp.dest('./public/dist/js/'));

    });

})();
