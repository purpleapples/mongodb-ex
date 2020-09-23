
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
        console.error(err);
    })
    
}
//testFindOne();
function testFind(){
    client.connect().then(client =>{
        const db = client.db("mydb");

        // db.collection("friends").find((err, cursor)=>{
        //     if(err){
        //         console.error(err);
        //     }else{
        //         console.log(cursor);
        //         console.forEach(item =>{
        //             console.log(item);
        //         })
        //     }
        // });
        // db.collection("friends").find().toArray().then(result =>{
        //     for (let index = 0; index < result.length; index++) {
        //         console.log(result[index]);
                
        //     }
        // }).catch(err => {
        //     console.error(err);
        // });
        db.collection("friends").find()
        .skip(2)
        .limit(2)
        .sort({name: -1})
        .toArray().then(result =>{
            for (let index = 0; index < result.length; index++) {
                console.log(result[index]);
                
            }
        }).catch(err => {
            console.error(err);
        });
    });   
};
testFind();