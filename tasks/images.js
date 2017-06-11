'use strict';

const $ 		= require('gulp-load-plugins')();
const gulp 		= require('gulp');
const multipipe = require('multipipe');


module.exports = function(options) {

	return function() {
		return multipipe(
			gulp.src(options.src),

			$.imagemin(),
			$.rev(),
			gulp.dest(options.dst),
			$.rev.manifest('images.json'),

			gulp.dest('manifest')
		)
	};
}