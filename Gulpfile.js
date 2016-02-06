"use strict";

var gulp = require("gulp");
var lint = require("gulp-eslint")
var sass = require("gulp-sass");
var rimraf = require("rimraf");

var config = {
  paths: {
    sass: "./src/sass/**/*.sass",
    js: "./src/js/**/*.js"
  }
}

gulp.task("clean-js", (cb) => {
  rimraf("./public/js", cb);
});

gulp.task("clean-css", (cb) => {
  rimraf("./public/css", cb);
});

gulp.task('css', ["clean-css"], () => {
  return gulp.src(config.paths.sass)
    .pipe(sass())
    .pipe(gulp.dest("./public/css"))
});

gulp.task('js', ["clean-js"], () => {
  return gulp.src(config.paths.js)
    .pipe(lint({config: ".eslintrc.json"}))
    .pipe(lint.format())
    .pipe(gulp.dest("./public/js"));
});

gulp.task("lint-server", () => {
  return gulp.src
});

gulp.task("watch", () => {
  gulp.watch(config.paths.sass, ["css"]);
  gulp.watch(config.paths.js, ["js"]);
});

gulp.task("default", ["css", "js", "watch"]);
