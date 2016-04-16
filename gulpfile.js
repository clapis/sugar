(function () {
    'use strict';

    var gulp = require('gulp');
    var requireDir = require('require-dir');
    var nodemon = require('gulp-nodemon');

    // load all tasks in task folder
    requireDir('./tasks/');

    // define tasks
    gulp.task('lint', ['lint-html']);
    gulp.task('build', ['libs-js', 'app-js', 'libs-css', 'app-css', 'libs-fonts']);

    gulp.task('dev',['build'], function() {
      nodemon({
          script: 'server.js',
          tasks: ['build'],
          ignore: ['public/dist']
      });
    });


})();
