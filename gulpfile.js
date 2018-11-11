var gulp = require("gulp");
var tslint = require('gulp-tslint');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');


//-----------------------------------------------------

// Decalrations

var paths = {
    src: 'src/**/*',
    srcViews: [
        'src/**/*.ejs',
        'src/**/*.html'
    ],
    srcStyles: 'src/**/*.css',
    srcJS: 'src/**/*.js',
    srcTS: 'src/**/*.ts',

    tmp: 'tmp',
    tmpIndex: 'tmp/index.html',
    tmpStyles: 'tmp/**/*.css',
    tmpJS: 'tmp/**/*.js',

    dist: 'dist',
    distIndex: 'dist/index.html',
    distStyles: 'dist/**/*.css',
    distJS: 'dist/**/*.js',

    files: [
        'package.json',
        'README.md',
        'LICENSE'
    ],
    tslint: 'tsconfig.json'
};


//-----------------------------------------------------

// Common gulp tasks:

// TSLint
gulp.task("ts-lint", () =>
    gulp.src(paths.srcTS)
        .pipe(tslint(paths.tslint))
        .pipe(tslint.report())
);

// Clean temp and dist folder
gulp.task('clean', function () {
    del([paths.tmp, paths.dist]);
});


//-----------------------------------------------------

// Build pipeline
// Copy tasks

// Views: HTML, Templates, ...
gulp.task('views:dist', function () {
    return gulp.src(paths.srcViews)
        .pipe(htmlclean())
        .pipe(gulp.dest(paths.dist));
});

// Styles: CSS, SCSS, ...
gulp.task('styles:dist', function () {
    return gulp.src(paths.srcStyles)
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist));
});

// JS files
gulp.task('js:dist', function () {
    return gulp.src(paths.srcJS)
        .pipe(concat('server.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

// TS files
gulp.task("typescript:dist", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.dist));
});

// Additional project files
gulp.task("additional:dist", function () {
    return gulp.src(paths.files)
        .pipe(gulp.dest(paths.dist));
});

// Copy tasks bundle
gulp.task('copy:dist', ['views:dist', 'styles:dist', 'js:dist', 'typescript:dist', 'additional:dist']);

// Build app to `dist`: Starting point
gulp.task('build', ['copy:dist']);


//------------------------------------------------------------------


// Development pipeline
// Copy tasks

// Views: HTML, EJS, ...
gulp.task('views', function () {
    return gulp.src(paths.srcViews).pipe(gulp.dest(paths.tmp));
});

// Styles: CSS, SCSS, ... 
gulp.task('styles', function () {
    return gulp.src(paths.srcStyles).pipe(gulp.dest(paths.tmp));
});

// JS files
gulp.task('js', function () {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});

// TS files
gulp.task("typescript", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.tmp));
});

// Copy tasks bundle 
gulp.task('copy', ['views', 'styles', 'js', 'typescript']);

// Serve the application from `tmp` folder
// gulp.task('serve', ['copy'], function () {
//     // return gulp.src(paths.tmp)
//     //     .pipe(webserver({
//     //         port: 8080,
//     //         livereload: true,
//     //         fallback: './index.html'
//     //     }));
// });

// Watch on changes in `src` folder
gulp.task('watch', ['copy'], function () {
    gulp.watch(paths.src, ['copy']);
});

// Gulp default starting point
gulp.task('default', ['watch'], function () {
});

gulp.task('dev', ['watch']);

//-----------------------------------------------------