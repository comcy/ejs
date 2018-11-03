var gulp = require("gulp");
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");


var paths = {
    pages: [
        'src/**/*.ejs',
        'src/**/*.html'],
    files: [
        'package.json',
        'README.md',
        'LICENSE'
    ]
};

// Static server
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./dist"
//         }
//     });
// });

// or...

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "yourlocal.dev"
//     });
// });

gulp.task('watch', function () { 
    gulp.watch(
        [
            './src/**/*.scss',
            './src/**/*.scss'
        ], ['styles']);

    gulp.watch([
        './src/**/*.ts',
        './src/**/*.ejs'
    ], function () {
        browserSync.init({
            server: {
                baseDir: "./dist/"
            },
            port: 8080
        });
    });

});

gulp.task("copy-views", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("copy-project-files", function () {
    return gulp.src(paths.files)
        .pipe(gulp.dest("dist"));
});


gulp.task("default", [
    "copy-views",
    "copy-project-files"
], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});