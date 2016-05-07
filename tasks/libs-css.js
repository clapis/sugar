(function() {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');

    var files = [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/angular-toastr/dist/angular-toastr.min.css'
    ];

    gulp.task('libs-css', function () {

        return gulp.src(files)
            .pipe(concat('lib.css'))
            .pipe(gulp.dest('./public/dist/css/'));
    });

})();
