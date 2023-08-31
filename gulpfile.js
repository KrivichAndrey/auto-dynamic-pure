const {src, dest, parallel, series, watch} = require("gulp");
const browserSync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const svgSprite = require("gulp-svg-sprite");
const del = require("del");
const replace = require("gulp-replace");

const svgSprites = () => {
   return src("./src/img/svg/**.svg")
      .pipe(svgSprite({
         mode: {
            stack: {
               sprite: "../sprite.svg"
            }
         }
      }))
      .pipe(dest("./app/img/svg/"))
      .pipe(browserSync.stream());
};

const styles = () => {
   return src("./src/css/**/*.css")
      .pipe(replace(/@img\//g, "../img/"))
      .pipe(dest("./app/css/"))
      .pipe(browserSync.stream());
};

const htmlInclude = () => {
   return src(["./src/*.html"])
      .pipe(fileinclude({
         prefix: "@@", basepath: "@file"
      }))
      .pipe(replace(/@img\//g, "./img/"))
      .pipe(dest("./app/"))
      .pipe(browserSync.stream());
};

const imgToApp = () => {
   return src([
      "./src/img/**/*.jpg",
      "./src/img/**/*.ico",
      "./src/img/**/*.png",
      "./src/img/**/*.webp",
      "./src/img/**/*.jpeg",
      "./src/img/**/*.svg",
      "!src/img/svg/*.svg"
   ])
      .pipe(dest("./app/img"));
};

const resources = () => {
   return src("./src/resources/**")
      .pipe(dest("./app/resources/"));
};

const clean = () => {
   return del(["app/*"]);
};

const scripts = () => {
   return src("./src/js/**/*.js")
      .pipe(dest("./app/js/"))
      .pipe(browserSync.stream());
};

const watchFiles = () => {
   browserSync.init({
      server: {
         baseDir: "./app"
      }
   });

   watch("./src/css/**/*.css", styles);
   watch("./src/**/*.html", htmlInclude);
   watch("./src/img/**/*.jpg", imgToApp);
   watch("./src/img/**/*.png", imgToApp);
   watch("./src/img/**/*.jpeg", imgToApp);
   watch("./src/img/**/*.ico", imgToApp);
   watch("./src/img/**.svg", imgToApp);
   watch("./src/img/**.webp", imgToApp);
   watch("./src/img/**/*.svg", svgSprites);
   watch("./src/resources/**/*", resources);
   watch("./src/js/**/*.js", scripts);
};

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.htmlInclude = htmlInclude;

exports.default = series(clean, parallel(htmlInclude, scripts, resources, imgToApp, svgSprites), styles, watchFiles);
