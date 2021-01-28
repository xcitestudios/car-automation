/// <binding AfterBuild='launch:all' />
"use strict";

const gulp = require("gulp");
const zip = require('gulp-zip');

gulp.task('lambda:zip', () => {
    return gulp.src('./dist/lamba-src/**')
        .pipe(zip('car-api.zip'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('lambda', gulp.series(['lambda:zip']));

gulp.task('s3', () => {
    return gulp.src('./s3-src/index.html')
        .pipe(gulp.dest('./dist/s3-src'))
});

gulp.task("launch:all", gulp.parallel(["lambda", "s3"]));
