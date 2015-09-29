var gulp = require('gulp'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	minifyHtml = require('gulp-minify-html'),
	minifyCss = require('gulp-minify-css'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	rimraf = require('gulp-rimraf'), //replaces gulp-clean?
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat');


// gulp.task('default', function () {
//     return gulp.src('src/app.js') //put the files you want annotated here 
//         .pipe(ngAnnotate())
//         .pipe(gulp.dest('dist'));
// });


gulp.task('copy-html-files', function() {
     gulp.src(['./app/**/*.html','!./app/index.html'], {base: './app'})
    .pipe(gulp.dest('build/'));
});

gulp.task('copy-img-files', function() {
     gulp.src(['./app/core/images/**/*.*'], {base: './app'})
    .pipe(gulp.dest('build/_assets/'));
});

gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify({mangle: false}), rev()]
    }))
    .pipe(gulp.dest('build/'));
});


// var files = [
//   'app/bower_components/angular/angular.js',
//   'app/bower_components/angular-route/angular-route.js',
//   'app/bower_components/angular-animate/angular-animate.js',
//   'app/bower_components/ngAnimate-animate.css/animate.js',
//   'app/core/services/geonamesApiLibrary.js',
//   'app/core/cac-app.js',
//   'app/countries/controllers/countriesController.js',
//   'app/country/controllers/countryController.js',
//   'app/core/routes.js'
// ]

// gulp.task('js', function() {
//   gulp.src('./app/index.html')
//     .pipe(uglify('combined.js', {
//       mangle: false    
//     }))
//     .pipe(gulp.dest('build/'))
// });

//cleanup task

gulp.task('build', ['copy-html-files','usemin', 'copy-img-files']);