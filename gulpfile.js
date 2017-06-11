'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();


function lazyRequireTask(taskName, path, options) {
	options = options || {}
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);

		return task(callback);
	});
}


// task html ::::::::::::::::::::::::::::::::::::::::::::
lazyRequireTask('html', './tasks/html', {
	src: 'source/**/*.html',
	dst: 'demo',
	name: 'html'
})


// task style :::::::::::::::::::::::::::::::::::::::::::
lazyRequireTask('styles', './tasks/style', {
	src: 'source/css/main.less',
	dst: 'demo/css',
	name: 'styles'
})


// task images ::::::::::::::::::::::::::::::::::::::::::
lazyRequireTask('images', './tasks/images', {
	src: 'source/img/**/*.{png,jpg,jpeg,gif,svg}',
	dst: 'demo/img'
})


// task js ::::::::::::::::::::::::::::::::::::::::::::::
lazyRequireTask('scripts', './tasks/scripts', {
	src: 'source/js/**/*.js',
	dst: 'demo/js',
	name: 'scripts'
})


// remove demo folder :::::::::::::::::::::::::::::::::::
lazyRequireTask('clean', './tasks/clean', {
	dst: 'demo'
})


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::
// task bulid :::::::::::::::::::::::::::::::::::::::::::
gulp.task('build', gulp.series(
	'clean', 
	gulp.parallel('styles', 'images', 'scripts'),
	'html'
));


// task watch :::::::::::::::::::::::::::::::::::::::::::
gulp.task('watch', () =>
	gulp.watch('source/**/*.*', gulp.parallel('html', 'styles', 'images', 'scripts'))
)


// task serve :::::::::::::::::::::::::::::::::::::::::::
gulp.task('serve', () =>
	browserSync.init({
		server: 'demo'
	}),
	browserSync.watch('source/**/*.*').on('change', browserSync.reload)
)


// gulp start :::::::::::::::::::::::::::::::::::::::::::
gulp.task('start', gulp.series(
	'build', 
	gulp.parallel('watch', 'serve'))
)