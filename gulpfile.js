/**
 * Created by marc-iten on 03.12.16.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var browsersync = require('browser-sync').create();

gulp.task('styles', function () {
    gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5% in CH'],
            cascade: false
        }))
        .pipe(cleancss({debug: true}, function(details) {
            //console.log(details.name + ' (org): ' + details.stats.originalSize);
        }))
        .pipe(gulp.dest('./styles/'));

});

gulp.task('default', function () {
    browsersync.init({
        server: {
            baseDir: "./"
        },
    });

    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch(['*.html', 'scss/**/*.scss']).on('change', browsersync.reload);
});
