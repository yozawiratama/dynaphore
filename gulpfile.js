var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
  // place code for your default task here
  return gulp.src([
      './controllers/init.js',
      './controllers/module.js',
      './controllers/router.js',
      './controllers/file.js',
      './controllers/server.js'
  ])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./'));
});