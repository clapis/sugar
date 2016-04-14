(function() {
    'use strict';

    var gulp = require('gulp');
    var bootlint = require('gulp-bootlint');


    gulp.task('lint-html', function () {
        return gulp.src(['./public/index.html'])
            .pipe(bootlint());
    });


})();
