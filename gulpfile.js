// Main module:
import  gulp from "gulp";
// Paths import:
import { path } from "./gulp/config/path.js";
// Plugins import:
import { plugins } from "./gulp/config/plugins.js"



// Transfer variables to global:
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}


// Tasks:
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgToSprite } from "./gulp/tasks/svgSprite.js";

// Wather function:
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgToSprite }

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
const mainTasks = gulp.parallel(fonts, copy, html, scss, js, images); 


// Build the Scenario: 
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

export { dev }
export { build }

// Execute the Scenario:
gulp.task('default', dev);
