// 여기서는 mongodb를 database로 연결하고 서버를 구동한다.

const {http} = require("http");
const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
const url = "mongo://192.168.55.";


// http로 서버 구동 후 listener 동작
function startExpress(){
    http.createServer(app).listen(app.get(port), ()=>{
        console.log("Web Server is running on port ", app.get("port"));
    });
}

// db와 연결후 db 객체를 app에서 사용할 object로 집어넣고 서버시작.
function startServer(){
    MongoClient.connect(url, {useUnifiedTopology=true}).then(
        client =>{
            const db = client.db("mydb");
            app.set("db",db);
            startExpress();
        }
    )
}

// 숙제다 홈페이지 하나 작성해서 부천에서 먹을 것 추천해서 내 메일로 보내라
// tjdvkf19@gmail.com