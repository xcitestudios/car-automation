/// <binding AfterBuild='zip:files' />
"use strict";

const gulp = require("gulp");
const zip = require('gulp-zip');

gulp.task('zip:files', () => {
    return gulp.src('./dist/**')
        .pipe(zip('car-api.zip'))
        .pipe(gulp.dest('./'));
});