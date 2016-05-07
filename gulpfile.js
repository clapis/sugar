(function () {
    'use strict';

    var gulp = require('gulp');
    var nodemon = require('gulp-nodemon');

    var tasks = require('./tasks');

    // define top-level tasks
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
