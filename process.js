function handle(req, res, query) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
        <h1>Form Data</h1>
        <p>Input Type: ${query.inputType}</p>
        <p>Input Value: ${query.inputValue}</p>
    `);
}

module.exports = {
    handle
};

// var http = require('http');
// var url = require('url');
// var port = process.env.PORT || 3000;
// http.createServer(function (req, res) {
//     var parsedUrl = url.parse(req.url, true);
//     if (parsedUrl.pathname == "/process") {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write("This is the process page");
//         res.end();
//     }
//     else {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write("whats that");
//         res.end();        
//     }
//   }).listen(port);
//   console.log("Server running at http://localhost:" + port);