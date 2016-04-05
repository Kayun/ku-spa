const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const cmq = require('gulp-group-css-media-queries');
const config = require('../config.js').styles;
const errorHandler = require('../helpers/errorHandler');

gulp.task('styles', () => {
  return gulp.src(config.entry, {cwd: config.srcDir})
    .pipe(plumber({errorHandler}))
    .pipe(gulpif(gutil.env.dev, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulpif(!gutil.env.dev, cmq()))
    .pipe(gulpif(!gutil.env.dev, csso()))
    .pipe(rename({
      extname: config.ext
    }))
    .pipe(gulpif(gutil.env.dev, sourcemaps.write()))
    .pipe(gulp.dest(config.distDir));
});
