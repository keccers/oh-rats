// Load plugins
var gulp      = require('gulp'),
    concat = require('gulp-concat'),
	  plugins   = require('gulp-load-plugins')({ camelize: true }),
    path      = require('path'),
    minifyCSS = require('gulp-minify-css'),
    asset_dir = './video/',
  	  lr        = require('tiny-lr'),
  	  server    = lr();

// Clean
gulp.task('clean', function() {
  gulp.src([path.join(asset_dir, 'css/build/*.css')], {read: false})
    .pipe(plugins.clean());
});

// Minify & Concat CSS
gulp.task('build-css', function(){
    return gulp.src('css/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(concat('build.css'))
    .pipe(gulp.dest('css/build/'))
});

// Watch
gulp.task('watch', function() {
  server.listen(35729, function(err) {
    if (err) return console.log(err);
  });

  gulp.watch('css/*.css', ['build-css'])

});

// Default task
gulp.task('default', ['clean', 'build-css', 'watch']);

// Production Build
gulp.task('build-prd', ['clean', 'build-css']);