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

  gulp.task("get", shell.task("curl http://localhost:8000/file.txt"));
  gulp.task("put", shell.task("curl -X PUT -d hello http://localhost:8000/file.txt"));
  gulp.task("delete", shell.task("curl -X DELETE http://localhost:8000/file.txt"));
  gulp.task("mkcol", shell.task("curl -X MKCOL http://localhost:8000/file.txt"));
  gulp.task("mocha", shell.task("npm test"));
  gulp.task("jsdoc", shell.task("jsdoc gulpfile.js"));
