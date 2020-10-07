//mongodb.md 파일에서 읽은 설명을 바탕으로 node.js와 연동해보자
// 일단 연동용 node js 설치
// 설치는 npm 으로 한다. npm install mongodb

// mongodb 연결 객체 instantiate
const {MongoClient} = require("mongodb");

// mongo 연결
function startServerEx1(){
    
    console.log("startServerEx1 ...");
    // mongodb 기본적인 url 구조 : mongodb://서버ip:port번호
    const url = "mongodb://192.168.55.70:27017";

    // mongodb 연결.
    // node.js에서 mongodb의 연결은 javascript의 promise를 사용한다.
    // parameter: url, {mongoClient설정값,..... }
    MongoClient.connect(url, {useUnifiedTopology:true} ).then(
        client => {
            console.log("mongodb://" + url + ": 27107 has been connected ....")

        }
    ).catch(err => {
        console.error(err);
    });
}

startServerEx1();