var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const mongoStr = "mongodb+srv://dwchen321:ZNMa3rWujgsimJzO@firstcluster.qwcwtxd.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster"
const dbName = "Stock";
const collectionName = "PublicCompanies";

http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;    

    if (path == '/') {
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
    } else if (path == '/process') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>current path is " + path + "<h1>"); 
        res.write("<h1> Search Result <h1>");
        var query = parsedUrl.query; 
        var temp = {};
        temp[query.inputType] = query.inputValue.trim();
        MongoClient.connect(mongoStr, function(err, client) {
            if (err) {
                console.log("db connection error", err);
                return;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            collection.find(temp).toArray(function(err, result) {
                if (err) {
                    console.log("erroring in finding in collection", err);
                    client.close();
                }
                if (result.length > 0) {
                    res.write("<ul>")
                    result.forEach(function(element) {
                        console.log(`Company name: ${element.company}, Ticker: ${element.ticker}, Share price: $${element.sharePrice}`);
                        res.write(`<li>Company name: ${element.company}, Ticker: ${element.ticker}, Share price: $${element.sharePrice}</li>`);
                    });
                    res.write("</ul>")
                } else {
                    res.write("<p>No matching document lol</p>")
                }
                res.end();
            })
        });        
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>404 Not Found lmaoooo</h1>');
        res.end();
    }
}).listen(port, () => {
    console.log("Server running on port " + port);
});
