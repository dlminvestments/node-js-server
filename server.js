const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(7777);

const server = require('server');

const { get, post } = server.router;

// Launch server
server({ port: 7777 }, [
    get('/', ctx => 'Hello world!')
]);
