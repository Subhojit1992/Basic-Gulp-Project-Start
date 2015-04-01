var gulp = require('gulp'),
	gulpSequence = require('gulp-sequence'),
	concat = require('gulp-concat');
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer');

//Scripts Tasks
//uglify and many script
gulp.task('scripts', function() {
	gulp.src([
			'js/vendor/jquery.js',
			'js/vendor/bootstrap.js',
			'js/html5-3.6-respond-1.4.2.min.js',
			'js/main.js'
		])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dest/js'));
});


//Style Tasks
//uglify
gulp.task('styles', function() {
	sass('scss/style.scss', { style: 'compressed' }) //you can put expanded or compressed
		.pipe(plumber())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('dest/css'));
});

//Image Tasks
//compressed
gulp.task('image', function() {
	gulp.src('img/*')
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('dest/img'));
});

//Watch Tasks
//watches js, scss, images
gulp.task('watch', function(){
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('scss/style.scss', ['styles']);
	gulp.watch('img/*', ['image']);
});


gulp.task('default', ['scripts', 'styles', 'image', 'watch']);