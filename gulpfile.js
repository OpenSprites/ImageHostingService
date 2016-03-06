'use strict'

const gulp = require('gulp')
const source = require('vinyl-source-stream')
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const browserify = require('browserify')
const babelify = require('babelify')

gulp.task('default', ['css', 'js', 'watch'])

gulp.task('watch', function() {
	nodemon({
		script: 'index.js',
		ext: 'html js styl',
		ignore: ['dist/*', 'uploads/*'],
		tasks: ['css', 'js']
	})
})

gulp.task('css', function() {
	return gulp.src('src/style.styl')
	.pipe(sourcemaps.init())
	.pipe(stylus({
		compress: true
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist'))
})

gulp.task('js', function() {
	return browserify({
		entries: 'src/index.js',
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('index.js'))
	.pipe(gulp.dest('dist'))
})
