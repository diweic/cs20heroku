var http = require('http');
var url = require('url');
var processForm = require('./process');  
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;    
    if (path === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("current path is " + path);    
        res.write(`
        <h1>Stock Ticker Form</h1>
        <form action="/process" method="get">
            <input type="radio" id="ticker" name="inputType" value="ticker" checked>
            <label for="ticker">Stock Ticker Symbol</label><br>
    
            <input type="radio" id="company" name="inputType" value="company">
            <label for="company">Company Name</label><br><br>
    
            <label for="inputValue">Enter the Stock Ticker Symbol or Company Name:</label><br>
            <input type="text" id="inputValue" name="inputValue"><br><br>
            
            <input type="submit" value="Submit">            
        </form>    
        `);
        res.end();
    }
    else if (path === '/process') {
        res.write("current path is " + path);    
        processForm.handle(req, res, parsedUrl.query);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
}).listen(port, () => {
    console.log("This goes to the console window");
});
