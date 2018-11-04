var gulp = require("gulp");
var tslint = require('gulp-tslint');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
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

// Inject task for automatically add dependencies to `index.html`
gulp.task('inject:dist', ['copy:dist'], function () {
    var css = gulp.src(paths.distStyles);
    var js = gulp.src(paths.distJS);
    return gulp.src(paths.distIndex)
        .pipe(inject(css, { relative: true }))
        .pipe(inject(js, { relative: true }))
        .pipe(gulp.dest(paths.dist));
});

// Build app to `dist`: Starting point
gulp.task('build', ['inject:dist']);


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

// Inject task for automatically add dependencies to `index.html`
gulp.task('inject', ['copy'], function () {
    var css = gulp.src(paths.tmpStyles);
    var js = gulp.src(paths.tmpJS);
    return gulp.src(paths.tmpIndex)
        .pipe(inject(js, { relative: true }))
        .pipe(inject(css, { relative: true }))
        .pipe(gulp.dest(paths.tmp));
});

// Serve the application from `tmp` folder
gulp.task('serve', ['inject'], function () {
    return gulp.src(paths.tmp)
        .pipe(webserver({
            port: 8080,
            livereload: true
        }));
});

// Watch on changes in `src` folder
gulp.task('watch', ['serve'], function () {
    gulp.watch(paths.src, ['inject']);
});

// Gulp default starting point
gulp.task('default', ['watch']);

gulp.task('dev', ['watch']);

//-----------------------------------------------------