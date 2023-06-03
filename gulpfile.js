/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sync from 'browser-sync';
import { deleteAsync } from 'del';
import rename from 'gulp-rename';
import gulppug from 'gulp-pug';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sharpResponsive from 'gulp-sharp-responsive';
import webpack from 'webpack-stream';
import webpackConf from './webpack.config.cjs';

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
  images: {
    src: 'source/img-2jpg-n-webp/*.png',
    srcLoseless: 'source/img-loseless/*.png',
    srcJpgOnly: 'source/img-2jpg-only/*.png',
    dest: 'build/img',
  },
  resources: {
    src: [
      'source/fonts/*.{woff2,woff}',
      'source/img/**/*.{png,jpg,jpeg,svg}',
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
  gulp.src('.')
    .pipe(webpack(webpackConf))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(sync.stream());
  done();
};

const copyResources = (done) => {
  gulp.src(paths.resources.src, { base: 'source' })
    .pipe(gulp.dest(paths.resources.dest));
  done();
};

const images = (done) => {
  gulp.src(paths.images.src)
    .pipe(sharpResponsive({
      formats: [
        {
          format: 'jpeg',
          rename: { suffix: '@1x' },
          jpegOptions: { progressive: true },
          width: (metadata) => metadata.width * 0.5,
        },
        {
          format: 'jpeg',
          jpegOptions: { progressive: true },
          rename: { suffix: '@2x' },
        },
        {
          format: 'webp',
          rename: { suffix: '@1x' },
          webpOptions: { lossless: false },
          width: (metadata) => metadata.width * 0.5,
        },
        {
          format: 'webp',
          rename: { suffix: '@2x' },
          webpOptions: { lossless: false },
        },
      ],
    }))
    .pipe(gulp.dest(paths.images.dest));
  gulp.src(paths.images.srcLoseless)
    .pipe(sharpResponsive({
      formats: [
        { format: 'png', rename: { suffix: '@1x' }, width: (metadata) => metadata.width * 0.5 },
        { format: 'png', rename: { suffix: '@2x' } },
        {
          format: 'webp',
          rename: { suffix: '@1x' },
          webpOptions: { lossless: true },
          width: (metadata) => metadata.width * 0.5,
        },
        {
          format: 'webp',
          rename: { suffix: '@2x' },
          webpOptions: { lossless: true },
        },
      ],
    }))
    .pipe(gulp.dest(paths.images.dest));
  gulp.src(paths.images.srcJpgOnly)
    .pipe(sharpResponsive({
      formats: [
        {
          format: 'jpeg',
          rename: { suffix: '@1x' },
          jpegOptions: { progressive: true, quality: 70 },
          width: (metadata) => metadata.width * 0.5,
        },
        {
          format: 'jpeg',
          jpegOptions: { progressive: true, quality: 70 },
          rename: { suffix: '@2x' },
        },
      ],
    }))
    .pipe(gulp.dest(paths.images.dest));
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
  copyResources,
  gulp.parallel(
    images,
    styles,
    scripts,
    pug,
  ),
);

// Default
export default gulp.series(
  cleanDirs,
  copyResources,
  gulp.parallel(
    images,
    styles,
    scripts,
    pug,
  ),
  gulp.series(
    server,
    watcher,
  ),
);
