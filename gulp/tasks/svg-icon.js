const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const path = require('path');
const svgSymbols = require('gulp-svg-symbols');
const config = require('../config.js');

gulp.task('svg-icon', () => {
  return gulp.src(`${config.path.images}svg/**/*.svg`)
    .pipe(svgSymbols({
      title: false,
      id: 'icon-%f',
      className: '%f',
      templates: [
        path.join(__dirname, '../helpers/svg-sprite.sass'),
        'default-svg'
      ]
    }))
    .pipe(gulpif(/[.]sass$/, gulp.dest(`${config.path.styles}helpers/`)))
    .pipe(gulpif(/[.]svg$/, rename('icons.svg')))
    .pipe(gulpif(/[.]svg$/, gulp.dest(config.path.dist)));
});
