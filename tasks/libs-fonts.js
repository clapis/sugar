(function() {
    'use strict';

    var gulp = require('gulp');

    var files = [
        './bower_components/bootstrap/dist/fonts/*.*'
    ];

    gulp.task('libs-fonts', function() {

        return gulp.src(files)
            .pipe(gulp.dest('./public/dist/fonts/'));

    });

})();
