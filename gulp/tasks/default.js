const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', () => {
  global.isWatch = true;
  runSequence(
    'build',
    'server',
    'watch'
  );
});

gulp.task('build', ['clean'], () => {
  runSequence(
    'svg-icon',
    [
      'copy',
      'styles',
      'templates',
      'scripts'
    ]
  );
});
