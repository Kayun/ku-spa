const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const config = require('../../webpack.config');

config.watch = !!gutil.env.dev;

gulp.task('scripts', function() {
  return webpack(
    config,
    function (error, stats) {
      gutil.log(stats.toString({
        hasError: true,
        colors: true,
        chunkModules: false,
        reasons: false
      }));
    })
});
