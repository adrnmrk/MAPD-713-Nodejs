const http = require('http')
let reqCount = 0;

http.createServer((req, res) => {
  reqCount++;  
  console.log("processing request: " + reqCount)  
  res.writeHead(200)
  res.end('hello world: ' + reqCount)
}).listen(8080)


