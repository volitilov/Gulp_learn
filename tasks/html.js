'use strict';

const $ 		= require('gulp-load-plugins')();
const gulp 		= require('gulp');
const multipipe = require('multipipe');


module.exports = function(options) {

	return function() {
		return multipipe(
			gulp.src(options.src),

			$.newer(options.name),
			$.revReplace({
				manifest: gulp.src([
					'manifest/css.json', 
					'manifest/js.json',
					'manifest/images.json'
				])
			}),
			$.htmlhint(),
			$.htmlhint.failReporter(),
			$.htmlmin({collapseWhitespace: true}),

			gulp.dest(options.dst)
		).on('error', $.notify.onError(function(err) {
			return {
				title: 'html file',
				message: err.message
			};
		}));
	};
}