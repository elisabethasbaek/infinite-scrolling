var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var sourcemap = require ("gulp-sourcemaps");
var cleanCSS = require("gulp-clean-css");
var resize = require("gulp-image-resize");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

function processHTML(){
    return gulp.src("src/html/**/*.html")
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
}

function processSass(){
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(cleanCSS({ compatibility: "ie9" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
}

function processJS(){
	return gulp.src("src/js/**/*.js")
	.pipe(sourcemap.init())
	.pipe(babel({
		presets: ["@babel/env"]
	}))
	.pipe(concat("app.js"))
	.pipe(sourcemap.write("."))
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
}

function processImages(){
	return gulp.src("src/images/**/*")
		.pipe(resize({
			width: 100,
			height: 0,
			crop: false,
      		upscale: false
		}))
        .pipe(gulp.dest("dist/images"))
		.pipe(connect.reload());
}

function watchEmAll(){
    gulp.watch("src/html/**/*.html",
    { ignoreInitial: false },
    processHTML);

    gulp.watch("src/scss/**/*.scss",
	{ ignoreInitial: false },
    processSass);
    
    gulp.watch("src/js/**/*.js",
	{ ignoreInitial: false },
	processJS);

    gulp.watch("src/images/**/*",
	{ ignoreInitial: false },
	processImages);
}

function server(){
    return connect.server({
        root: "dist",
        livereload: true
    });
};

gulp.task("default", gulp.parallel(server, watchEmAll));
