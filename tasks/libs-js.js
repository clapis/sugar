(function() {
    'use strict';

    var fs = require('fs');
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

        console.log('Bundling of 3r party libraries');

        // check that all file references are correct
        var missing = files.filter(function (f) { return !fs.existsSync(f); });

        if (missing.length > 0) {
            console.log('*********** ERROR ************');
            console.log('Following files cannot be found:');
            console.log(missing);
            return false;
        }

        console.log(files);

        return gulp.src(files)
            .pipe(concat('libs.js'))
            .pipe(gulp.dest('./public/dist/js/'));

    });

})();
