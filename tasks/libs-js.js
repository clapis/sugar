(function() {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');

    var files = [
        'jquery/dist/jquery.min.js',
        'bootstrap/dist/js/bootstrap.min.js',
        'respond-minmax/dest/respond.min.js',
        'angular/angular.min.js',
        'angular-ui-router/release/angular-ui-router.min.js',
        'angular-toastr/dist/angular-toastr.min.js',
        'angular-toastr/dist/angular-toastr.tpls.js'
    ];

    gulp.task('libs-js', function () {

        return gulp.src(files, { cwd: './bower_components' })
            .pipe(concat('libs.js'))
            .pipe(gulp.dest('./public/dist/js/'));

    });

})();
