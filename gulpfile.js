import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sync from 'browser-sync';
import { deleteAsync } from 'del';
import rename from 'gulp-rename';
import gulppug from 'gulp-pug';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

const paths = {
  pug: {
    src: 'source/pug/*.pug',
    watch: 'source/pug/**/*.pug',
    dest: 'build/',
  },
  styles: {
    src: 'source/sass/style.scss',
    watch: 'source/sass/**/*.scss',
    dest: 'build/css/',
  },
  scripts: {
    src: 'source/js/script.js',
    watch: 'source/js/**/*.js',
    dest: 'build/js/',
  },
  resources: {
    src: [
      'source/fonts/*.{woff2,woff}',
      'source/img/**/*.{jpg,png,svg}',
    ],
    dest: 'build/',
  },
};

const cleanDirs = async () => { await deleteAsync(['build']); };

const pug = (done) => {
  gulp.src(paths.pug.src)
    .pipe(plumber())
    .pipe(gulppug())
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(sync.stream());
  done();
};

const styles = (done) => {
  gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(rename({
      basename: 'style',
      extname: '.css',
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(postcss([
      autoprefixer(),
      csso(),
    ]))
    .pipe(rename({
      basename: 'style',
      suffix: '-min',
      extname: '.css',
    }))
    .pipe(gulp.dest(paths.styles.dest, { sourcemaps: '.' }))
    .pipe(sync.stream());
  done();
};

const scripts = (done) => {
  gulp.src(paths.scripts.src)
    .pipe(rename({
      basename: 'script',
      suffix: '-min',
      extname: '.js',
    }))
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(terser({
      toplevel: 'true',
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(sync.stream());
  done();
};

const copyResources = (done) => {
  gulp.src(paths.resources.src, { base: 'source' })
    .pipe(gulp.dest(paths.resources.dest));
  done();
};

const reload = (done) => {
  sync.reload();
  done();
};

const watcher = () => {
  gulp.watch(paths.styles.watch, gulp.series(styles));
  gulp.watch(paths.scripts.watch, gulp.series(scripts));
  gulp.watch(paths.pug.watch, gulp.series(pug, reload));
};

const server = (done) => {
  // let myBrowser = '';
  // if (process.argv.length > 2) {
  //   myBrowser = process.argv[2].slice(2);
  //   console.log('using browser: ' + myBrowser);
  // }
  sync.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    ui: false,
    // browser: myBrowser,
    open: false,
  });
  done();
};

// BUILD
export const build = gulp.series(
  cleanDirs,
  gulp.parallel(
    copyResources,
    styles,
    scripts,
    pug,
  ),
);

// Default
export default gulp.series(
  cleanDirs,
  gulp.parallel(
    copyResources,
    styles,
    scripts,
    pug,
  ),
  gulp.series(
    server,
    watcher,
  ),
);
