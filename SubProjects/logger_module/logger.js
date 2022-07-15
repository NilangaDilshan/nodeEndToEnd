var url = "http://mylogger.i/log";
function log(message) {
  //send an http request
  console.log(message);
}

module.exports.log = log;
module.exports.endpoint = url;
