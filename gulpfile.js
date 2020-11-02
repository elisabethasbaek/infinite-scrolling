var gulp = require("gulp"); //import gulp
var sass = require("gulp-sass"); //import gulp-sass
var cleanCSS = require("gulp-clean-css");
var connect = require("gulp-connect");

function processHTML(){
    return gulp.src("src/html/**/*.html")
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
}

function processSass(){
    return gulp.src("src/sass/**/*.scss") //stjerne stjerne = alle undermapper i mappen
        .pipe(sass()) //præprocessor
        .pipe(cleanCSS({ compatibility: "ie9" }))
        .pipe(gulp.dest("dist/assets/css")) //output (dest = destination, dist = distribution)
        .pipe(connect.reload());
}

function watchEmAll(){
    gulp.watch("src/sass/**/*.scss",
    { ignoreInitial: false },
    processSass);

    gulp.watch("src/html/**/*.html",
    { ignoreInitial: false },
    processHTML);
}

function server(){
    return connect.server({
        root: 'dist',
        livereload: true
    });
};

gulp.task("default", gulp.parallel(server, watchEmAll));
