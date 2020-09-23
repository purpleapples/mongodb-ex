
// test
const { MongoClient } = require("mongodb");
// old :  const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://192.168.1.118:27017';// db 선택은 옵션 default port value = 27017
const dbName = "mydb";

const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true }) ;

function testConnect(){
    client.connect((err, client) =>{
        if (err){
            console.error(err);
        }else{
            // connection success
            console.log(client);
        }
    });
}
// testConnect();

// insert, insertMany
function testInsertDocument(docs){
    // doc 배열이면 -> insertMany
    // 단일 객체면 -> insert

    if(Array.isArray(docs)){
        // insertMany
        // db.collection.insert({},{},{},{}....)
        // SQL: INSERT INTO table VALUES(...), (...), (...)
        client.connect().then(client=>{
            const db = client.db("mydb");
            db.collection("friends").insertMany(docs)
            .then(result => {
                console.log(result.insertedCount, "개의 문서가 삽입");
            });            
        }).catch(err =>{
            console.log(err);
        });
    }else{
        // insert
        // db.collection.insert({document});
        // QL: INSERT INTO table VALUES(...);
        client.connect((err, client) => {
            const db = client.db("mydb");
            // collection 객체에 접근 
            db.collection("friends").insertOne(docs,(err, result) =>{
                if(err){
                    console.err(err);
                }else{
                    console.log(result);
                    console.log(result.insertedCount, "개의 문서 insert");
                    client.close();
                }
            })
        });
    }
}

// testInsertDocument({name:"wayne", job:"batman"});
// testInsertDocument([
//     {name:"고길동", gender:"M", species:"human", age:"50"},
//     {name:"둘리", gender:"M", species:"dinosaur", age:"100000000"},
//     {name:"도우너", gender:"M", species:"alien", age:"15"},
//     {name:"또치", gender:"F", species:"ostrich", age:"13"},
//     {name:"마이콜", gender:"M", species:"human", age:"25"},
//     {name:"봉미선", gender:"F", species:"human", age:"35"}
     
// ]);
function testDeleteAll(){
    // db.collection.delete() : 전체 삭제
    // SQL : DELETE FROM table;
    client.connect().then(client => {
        const db= client.db("mydb");
        db.collection("friends").deleteMany({}).then(
            result => {
                console.log(result.deletedCount, "개의 문서 삭제");
            }
        );

    }).catch(err => {
        console.error(err);
    });
}

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