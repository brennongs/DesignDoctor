//===depends===\\
//===MUST RUN npm i===\\
const gulp = require('gulp'),
   concat = require('gulp-concat'),
   sass = require('gulp-sass'),
   annotate = require('gulp-ng-annotate'),
   sourcemaps = require('gulp-sourcemaps'),
   CacheBuster = require('gulp-cachebust'),
   print = require('gulp-print'),
   babel = require('gulp-babel');

const cachebust = new CacheBuster();


//===SASS===\\
gulp.task('sass', function() {
    return gulp.src('./public/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public'));
});

//===convert es6===\\
//===compress and combine JS files===\\
gulp.task('js', function() {
    return gulp.src(['./public/app.js','./public/app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(babel({presets: ['es2015'] }))
        .pipe(concat('bundle.js'))
        .pipe(annotate())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
});

//===WATCHING *.*===\\
//===for new files, stop and restart gulp===\\
gulp.task('watch', function() {
    gulp.watch(['./public/app/app.js','./public/app/**/*.js'], ['js']);
    gulp.watch('./public/styles/main.scss', ['sass']);
});

//===gulp task - runs all tasks in order===\\
gulp.task('default', ['js', 'sass','watch']);
