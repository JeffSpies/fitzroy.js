/*jslint indent:2, node:true, sloppy:true*/
var
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    webserver = require('gulp-webserver');
    browserify   = require('browserify');
    watchify     = require('watchify');

var source = require('vinyl-source-stream');

var banner = [
    '/**',
    ' ** FitzRoy.js',
    ' ** @author jeffspies',
    ' ** @author caneruguz',
    ' **/',
    ''
].join('\n');

var paths = {
    js: ['./index.js']
};

gulp.task('webserver', function(){
    gulp.src('./examples')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        })
    );
});

gulp.task('example', function () {
    var bundleStream = browserify(paths.js, {standalone: 'FitzRoy', debug : true }).bundle();
    bundleStream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./examples/'))
});

gulp.task('dist_full', function () {
    gulp.src(paths.js)
        .pipe(concat('fitzroy.js'))
        .pipe(header(banner))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('dist_min', function () {
    gulp.src(paths.js)
        .pipe(uglify())
        .pipe(concat('fitzroy.min.js'))
        .pipe(header(banner))
        .pipe(gulp.dest('./dist/'))
});


/* Watch task */
gulp.task('watch', function () {
    gulp.watch([paths.js, './examples/index.html'], ['example', 'dist_min', 'dist_full']);
});


/* Default task */
gulp.task('default', ['example', 'dist_min', 'dist_full', 'webserver']);