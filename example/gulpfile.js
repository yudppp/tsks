var gulp = require('gulp');
var print = require('gulp-print');

gulp.task('print', function() {
  gulp.src('package.json')
    .pipe(print())
});