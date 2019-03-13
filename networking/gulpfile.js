/** gulpfile.js
* @author Edgar Figueroa González - Grado en Ingeniería Informática ULL
*/

var gulp = require("gulp");
var shell = require("gulp-shell");

  gulp.task("pre-install", shell.task([
        "npm i -g gulp static-server",
        "npm install -g nodemon",
        "npm install -g gulp-shell"
  ]));

  gulp.task("service", shell.task("node test-json-service.js"));
  gulp.task("mocha", shell.task("npm test"));
  gulp.task("jsdoc", shell.task("jsdoc *.js"));
