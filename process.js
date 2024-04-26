var http = require('http');
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (req.url == "/process") {
        res.write("This is the process page");
        res.end();
    }
  }).listen(port);