/*jslint indent:2, node:true, sloppy:true*/
var
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    livereload = require('gulp-livereload');
    browserify   = require('browserify');
    watchify     = require('watchify');

var source = require('vinyl-source-stream');

var banner = [
    '/**',
    ' ** <APP NAME>',
    ' ** @author jeffspies',
    ' **/',
    ''
].join('\n');

//var build = false;
//
var paths = {
    js: ['./index.js']
};

//gulp.task('browserify-app', function() {
////    var bundleMethod = global.isWatching ? watchify : browserify;
//    var bundleMethod = browserify;
//
//    var bundler = bundleMethod({
//        // Specify the entry point of your app
//        entries: ['./index.js'],
//        // Add file extentions to make optional in your requires
//        extensions: ['.js']
//    });
//
//    var bundle = function() {
//        // Log when bundling starts
//        //bundleLogger.start();
//
//        return bundler
//            // Enable source maps!
//            .bundle({debug: !gulp.env.production})
//            // Report compile errors
//            //.on('error', handleErrors)
//            // Use vinyl-source-stream to make the
//            // stream gulp compatible. Specifiy the
//            // desired output filename here.
//            .pipe(source('main.js'))
//            // Specify the output destination
//            .pipe(gulp.dest('.tmp/scripts'));
//            // Log when bundling completes!
//            //.on('end', bundleLogger.end);
//    };
//
//    if(global.isWatching) {
//        // Rebundle with watchify on changes.
//        bundler.on('update', bundle);
//    }
//
//    return bundle();
//});

/* Scripts */
gulp.task('example', function () {
    var bundleStream = browserify(paths.js, {standalone: 'FitzRoy', debug : true }).bundle();
    bundleStream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./examples/'))
});

// Using gulp.src piped to brwoserfiy and bundled did not work

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
gulp.task('default', ['example', 'dist_min', 'dist_full', 'watch']);