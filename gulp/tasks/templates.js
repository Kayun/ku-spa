'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const jade = require('gulp-jade');
const inheritance = require('gulp-jade-inheritance');
const cached = require('gulp-cached');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const prettify = require('gulp-jsbeautifier');
const config = require('../config.js');
const configTemplate = config.templates;
const gulpif = require('gulp-if');
const errorHandler = require('../helpers/errorHandler');

gulp.task('templates', () => {
  return gulp.src(`${configTemplate.srcDir}/**/*.jade`)
    .pipe(plumber({errorHandler}))
    .pipe(cached('jade'))
    .pipe(gulpif(gutil.env.dev, inheritance({basedir: configTemplate.srcDir})))
    .pipe(filter(file => {
      return /templates[\\\/]pages/.test(file.path);
    }))
    .pipe(jade())
    .pipe(prettify(configTemplate.prettify))
    .pipe(rename({dirname: '.'}))
    .pipe(gulp.dest(configTemplate.distDir));
});
