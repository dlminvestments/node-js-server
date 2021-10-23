var url = require('url');
var http = require('http');
var HttpProxyAgent = require('http-proxy-agent');

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || 'http://192.168.1.158:8081';
console.log('using proxy server %j', proxy);

// HTTP endpoint for the proxy to connect to
var endpoint = process.argv[2] || 'http://nodejs.org/api/';
console.log('attempting to GET %j', endpoint);
var opts = url.parse(endpoint);

// create an instance of the `HttpProxyAgent` class with the proxy server information
var agent = new HttpProxyAgent(proxy);
opts.agent = agent;

http.get(opts, function (res) {
  console.log('"response" event!', res.headers);
  res.pipe(process.stdout);
});
