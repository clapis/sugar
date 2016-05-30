(function() {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');

    var files = [
        'bootstrap/dist/css/bootstrap.min.css',
        'angular-toastr/dist/angular-toastr.min.css'
    ];

    gulp.task('libs-css', function () {

        return gulp.src(files, { cwd: './bower_components'})
            .pipe(concat('libs.css'))
            .pipe(gulp.dest('./public/dist/css/'));
    });

})();
