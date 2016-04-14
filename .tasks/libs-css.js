(function() {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');

    var files = [
        './bower_components/bootstrap/dist/css/bootstrap.min.css'
    ];

    gulp.task('libs-css', function () {

        //TODO: check referenced files on disk. gulp-expect-file?

        return gulp.src(files)
            .pipe(concat('libs.css'))
            .pipe(gulp.dest('./public/dist/css/'));
    });

})();
