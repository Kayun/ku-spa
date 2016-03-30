const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const gulp = require('gulp');
const config = require('../config.js');

gulp.task('server', () => {
  
  browserSync.watch(`${config.path.dist}**/*`, function (event, file) {
    if (event !== 'change') return false;
    if (/\.js|html$/.test(file)) {
      browserSync.reload();
    } else {
      browserSync.reload(file);
    }
  });
  
  browserSync.init({
    open: !!gutil.env.open,
    reloadOnRestart: true,
    reloadDelay: 300,
    port: 3000,
    files: [`${config.path.dist}**/*`],
    server: {
      baseDir: config.path.dist,
      directory: false
    }
  });
});
