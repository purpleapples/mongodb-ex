const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://192.168.1.118:27017';
const dbName = "mydb";

const client = new MongoClient(url, {useNewUrlParser: true});

client.connect(function(err, client){
    assert.equal(null, err);
    console.log("MongoDB Connected");
    client.close();
});
