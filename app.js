// Express module

const express = require("express");
const http = require("http");

// Express object 생성
const app = express();
// set method : express 내부에 여러 값을 설정(주로 설정값)
app.set("port", 3000);

function startExpress(){
    http.createServer(app).listen(app.get("port"), () => {
        console.log("Web Server is running on port ", app.get("port"));
    });
}

startExpress(); //express 실행
