// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
const options = {
  target: ' https://dlm-investments0.webnode.com', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path', // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target ' https://dlm-investments0.webnode.com' to 'http://localhost:7777'
    'dev.localhost:3000': 'http://localhost:7777',
  },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
const app = express();
app.use('/api', exampleProxy);
app.listen(7777);
