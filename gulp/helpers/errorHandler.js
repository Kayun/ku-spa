const notify = require('gulp-notify');
const gutil = require('gulp-util');

module.exports = notify.onError(error => {
  gutil.beep();
  gutil.log(gutil.colors.red(error.message));
  return {
    title: error.plugin,
    message:
      '\nFile: <%= error.relativePath %>\n' +
      'Message: <%= error.messageOriginal %>\n' +
      'Line: <%= error.line %>\n' +
      'Column: <%= error.column %>'
  }
});
