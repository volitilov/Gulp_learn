'use strict';

const $ 		= require('gulp-load-plugins')();
const gulp 		= require('gulp');
const multipipe = require('multipipe');


module.exports = function(options) {

	return function() {
		return multipipe(
			gulp.src(options.src),

			$.newer(options.name),
			// $.autopolyfiller(options.src),
			$.uglify(),
			$.rev(),

			gulp.dest(options.dst),
			$.rev.manifest('js.json'), 
			gulp.dest('manifest')

		).on('error', $.notify.onError(function(err) {
			return {
				title: 'js file',
				message: err.message
			};
		}));
	};
}