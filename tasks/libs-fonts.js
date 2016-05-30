(function() {
    'use strict';

    var gulp = require('gulp');

    var files = [
        'bootstrap/dist/fonts/*.*'
    ];

    gulp.task('libs-fonts', function() {

        return gulp.src(files, { cwd: './bower_components' })
            .pipe(gulp.dest('./public/dist/fonts/'));

    });

})();
