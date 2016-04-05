const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');

gulp.task('copy:resource', () => {
  return gulp.src('**/*',
    {
      cwd: 'src/resources',
      base: 'src/resources'
    })
    .pipe(newer('public'))
    .pipe(gulp.dest('public'));
});

gulp.task('copy:img', () => {
  return gulp.src('**/*.{jpg,png,svg}',
    {
      cwd: 'src/images',
      base: 'src/images'
    })
    .pipe(newer('public/assets/images'))
    .pipe(gulp.dest('public/assets/images'));
});

gulp.task('copy', [
  'copy:img',
  'copy:resource'
]);
