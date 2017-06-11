'use strict';

const $ 		= require('gulp-load-plugins')();
const gulp 		= require('gulp');
const multipipe = require('multipipe');
const combine 	= require('stream-combiner2');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function(options) {

	return function() {
		return multipipe(
			gulp.src(options.src, {since: gulp.lastRun(options.name)}),

			$.newer(options.name),
			$.if(isDevelopment, $.sourcemaps.init()),
			$.less(),
			$.autoprefixer([
				'Android 2.3',
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24', // Firefox 24 is the latest ESR
				'Explorer >= 8',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6']),
			$.csscomb(),
			$.uncss({
				html: ['index.html', 'source/**/*.html']
			}),
			$.if(isDevelopment, $.sourcemaps.write()),
			$.cleanCss({compatibility: 'ie8'}),
			$.rename({suffix: '.min'}),
			$.rev(),

			gulp.dest(options.dst),
			$.rev.manifest('css.json'), 
			gulp.dest('manifest')

		).on('error', $.notify.onError(function(err) {
			return {
				title: 'less file',
				message: err.message
			};
		}));
	};
}