
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
    
};

//testFindOne();
function testFind(){
    // 조건을 만족하는 문서의 cursor를 반환한다.
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
//testFind();
function testFindBinding(){
    client.connect().then(client => {
        const db = client.db("mydb");
        db.collection("friends").find().toArray().then(result =>{
            for (let index = 0; index < result.length; index++) {
                console.log(result[index]);                
            }
        })
    }).catch(err => {
        console.error(err);
    })
};
//testFindBinding();

function testFindByCondition(projection, condition){
    client.connect().then(client => {
        const db = client.db("mydb");
        db.collection("friends").find(
            condition,
            projection
        ).toArray().then(
            result =>
            {   console.log(result);
                for (let index = 0; index < result.length; index++) {
                    console.log(
                        result[index]
                    );
                    
                }
            }
        )
    }).catch(err =>{
        console.error(err);
    });
}
// projection 객체 : 1이면 표시, 0이면 표시하지 않음
testFindByCondition( {name : 1, age: 1, species: 1} , 
    {
        $and:[
            {age: {$gte:"10"}},
            {age: {$lte:"50"}}
        ] // 20세 이상 50 세 이하
    }
    );

    
