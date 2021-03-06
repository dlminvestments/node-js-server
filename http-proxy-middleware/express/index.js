/**
 * Module dependencies.
 */
const express = require('express');
const { createProxyMiddleware } = require('../../dist'); // require('http-proxy-middleware');

/**
 * Configure proxy middleware
 */
const jsonPlaceholderProxy = createProxyMiddleware({
  target: 'http://jsonplaceholder.typicode.com',
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug',
});

const app = express();

/**
 * Add the proxy to express
 */
app.use('/users', jsonPlaceholderProxy);

app.listen(7777);

console.log('[DEMO] Server: listening on port 7777');
console.log('[DEMO] Opening: http://localhost:7777/users');

require('open')('http://localhost:7777/users');
