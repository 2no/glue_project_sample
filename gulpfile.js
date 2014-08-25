'use strict';

var gulp = require('gulp')
  , $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*']
      , replaceString: /\bgulp[\-.]/
    })
  , runSequence = require('run-sequence')
  , paths = {
        scssDir:     'src/scss'
      , templateDir: 'src/template'
      , rootDir:     'dist'
    }
  ; 

gulp.task('glue', function() {
  return gulp.src(paths.rootDir + '/img/icons')
    .pipe($.spriteGlue(paths.rootDir + '/img', {
        scss: paths.scssDir + '/css/_sprite'
      , scssTemplate: paths.templateDir + '/scss.jinja'
    }))
  ;
});

gulp.task('scss', function() {
  return gulp.src([
        paths.scssDir + '/**/*.scss'
      , '!**/_*/**/*'
    ])
    .pipe($.plumber())
    .pipe($.rubySass({
        bundleExec: true
      , style: 'expanded'
    }))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(paths.rootDir))
  ;
});

gulp.task('watch', function() {
  gulp.watch(paths.scssDir + '/**/*.scss', ['scss']);
  gulp.watch(paths.rootDir + '/img/icons/*', function() {
    runSequence('glue', 'scss');
  });
});

gulp.task('default', ['watch']);
