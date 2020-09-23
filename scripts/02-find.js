
// test
const { MongoClient } = require("mongodb");
// old :  const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://192.168.1.118:27017';// db 선택은 옵션 default port value = 27017
const dbName = "mydb";

const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true }) ;

function testFindOne(){
    client.connect().then(client =>{
        const db = client.db("mydb");
        db.collection("friends").findOne().then(result =>{
            console.log(result);
        });
    }).catch(err => {
        console.err(err);
    })
}
testFindOne();