/// <binding AfterBuild='launch:all' />
"use strict";

const gulp = require("gulp");
const zip = require('gulp-zip');

gulp.task('lambda:zip', () => {
    return gulp.src(['./dist/lamba-src/**'])
        .pipe(gulp.src(['./lambda-layer/nodejs/node_modules/**'], { dot: true, passthrough: true, base: './lambda-layer/nodejs/' }))
        .pipe(zip('car-api.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('lambda', gulp.series(['lambda:zip']));

gulp.task("launch:all", gulp.parallel(["lambda"]));
