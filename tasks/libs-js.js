(function() {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');

    var files = [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/respond-minmax/dest/respond.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './bower_components/angular-toastr/dist/angular-toastr.min.js',
        './bower_components/angular-toastr/dist/angular-toastr.tpls.js'
    ];

    gulp.task('libs-js', function () {

        return gulp.src(files)
            .pipe(concat('libs.js'))
            .pipe(gulp.dest('./public/dist/js/'));

    });

})();
