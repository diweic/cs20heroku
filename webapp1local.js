const MongoClient = require('mongodb').MongoClient;
const mongoStr = "mongodb+srv://dwchen321:ZNMa3rWujgsimJzO@firstcluster.qwcwtxd.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster"
const dbName = "Stock";
const collectionName = "PublicCompanies";
var readline = require('readline');
var fs = require('fs');

MongoClient.connect(mongoStr, function(err, client) {
    if (err) {
        console.log("db connection error", err);
        return;
    }

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    var myFile = readline.createInterface({
        input: fs.createReadStream('companies-1.csv')
    });

    let isHeadLine = true;
    let lineCounter = 0;
    myFile.on('line', function(line) {
        if (isHeadLine) {
            isHeadLine = false;
            return;
        }
        // console.log("the current line is ", line);
        let lineContent = line.split(',');
        let document = {
            company : lineContent[0],
            ticker : lineContent[1],
            sharePrice : parseFloat(lineContent[2])
        };
        lineCounter++;

        collection.insertOne(document, function(err) {
            if (err) {
                console.log("error inserting document: ", err);
            }
            else {
                console.log("new element inserted");
            };
            lineCounter--;
            if (lineCounter === 0) {
                console.log("All insertions complete, closing connection...");
                client.close();
            }            
        });
    });
});
