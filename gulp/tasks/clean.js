'use strict';

const gulp = require('gulp');
const del = require('del');
const gutil = require('gulp-util');
const config = require('../config.js');

gulp.task('clean', () => {
  return del(config.path.dist).then(() => {
    gutil.log(gutil.colors.green('Delete folder ' + config.path.dist));
  });
});
