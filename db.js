const { MongoClient } = require("mongodb");
// old :  const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://192.168.1.118:27017';
const dbName = "mydb";

const client = new MongoClient(url, {useNewUrlParser: true});

function connectMongo(){
    client.connect((err, client) =>{
        if (err){
            console.error(err);
        }else{
            // connection success
            console.log(client);
        }
    });
}
module.exports = connectMongo
connectMongo();
