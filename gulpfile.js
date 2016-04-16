(function () {
    'use strict';

    var gulp = require('gulp');
    var requireDir = require('require-dir');
    var nodemon = require('gulp-nodemon');

    // load all tasks in task folder
    requireDir('./.tasks/');

    // define tasks
    gulp.task('lint', ['lint-html']);
    gulp.task('build', ['libs-js', 'app-js', 'libs-css', 'app-css', 'libs-fonts']);

    // watch for file changes
    gulp.task('watch', function () {

        // app js files
        gulp.watch('./app/**/*.js', ['app-js']);

        // app css files
        gulp.watch('./css/*.css', ['app-css'])

    });

    gulp.task('dev', ['build', 'watch'] ,function() {
      nodemon({ script: 'server.js' });
    });


})();
