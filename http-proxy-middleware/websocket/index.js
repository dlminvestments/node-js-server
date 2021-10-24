/**
 * Module dependencies.
 */
const express = require('express');
const { createProxyMiddleware } = require('../../dist'); // require('http-proxy-middleware');

/**
 * Configure proxy middleware
 */
const wsProxy = createProxyMiddleware('/', {
  target: 'http://echo.websocket.org',
  // pathRewrite: {
  //  '^/websocket' : '/socket',        // rewrite path.
  //  '^/removepath' : ''               // remove path.
  // },
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  ws: true, // enable websocket proxy
  logLevel: 'debug',
});

const app = express();
app.use('/', express.static(__dirname)); // demo page
app.use(wsProxy); // add the proxy to express

const server = app.listen(7777);
server.on('upgrade', wsProxy.upgrade); // optional: upgrade externally

console.log('[DEMO] Server: listening on port 7777');
console.log('[DEMO] Opening: http://localhost:7777');

require('open')('http://localhost:3000');

/**
 * Example:
 * Open http://localhost:7777 in WebSocket compatible browser.
 * In browser console:
 * 1. `const socket = new WebSocket('ws://localhost:7777');`          // create new WebSocket
 * 2. `socket.onmessage = function (msg) {console.log(msg)};`       // listen to socket messages
 * 3. `socket.send('hello world');`                                 // send message
 * >  {data: "hello world"}                                         // server should echo back your message.
 **/
