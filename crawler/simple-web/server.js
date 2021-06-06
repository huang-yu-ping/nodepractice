const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");

  switch (req.url) {
      case '/':
          res.end('hi, index page');
      case '/test':
          res.end('test page');
      case '/about':
            res.end('about page');
          break;
      default:
          res.writeHead(404);
          res.end('404 not found');
      
  }
});

server.listen(3000, () => console.log('server already running...'));



