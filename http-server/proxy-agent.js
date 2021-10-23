var http = require('http');
var ProxyAgent = require('proxy-agent');

// HTTP, HTTPS, or SOCKS proxy to use
var proxyUri = process.env.http_proxy || 'http://192.168.1.158:8081';

var opts = {
  method: 'GET',
  host: 'jsonip.org',
  path: '/',
  // this is the important part!
  // If no proxyUri is specified, then https://www.npmjs.com/package/proxy-from-env
  // is used to get the proxyUri.
  agent: new ProxyAgent(proxyUri)
};

// the rest works just like any other normal HTTP request
http.get(opts, onresponse);

function onresponse (res) {
  console.log(res.statusCode, res.headers);
  res.pipe(process.stdout);
}
