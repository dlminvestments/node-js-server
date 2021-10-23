var http = require('http');
var setup = require('proxy');

var server = setup(http.createServer());
server.listen(4444, function () {
  var port = server.address().port;
  console.log('HTTP(s) proxy server listening on port 4444, port);
});
