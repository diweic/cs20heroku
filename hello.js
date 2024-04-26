var http = require('http');
var port = process.env.PORT || 3000;
console.log("This goes to the console window");
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write ("Success!  This app is deployed online");
    res.write("<h2>Hello World</h2>");
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
}).listen(port);