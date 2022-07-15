const EventEmitter = require("events");
// Module code actually lives in here
/* console.log(__filename);
console.log(__dirname); */

var url = "http://mylogger.i/log";
/* var logger = function log(message) {
  console.log(message);
};
module.exports.log = logger;
 */
class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("messageLogged", { id: 1, url: "http://test.com/end" });
  }
}

module.exports = Logger;

/* (function (exports, require, module, __filename, __dirname) {
}); */
