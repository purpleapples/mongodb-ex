// Express module

const express = require("express");
const http = require("http");
const {ObjectId} = require("mongodb");
// 몽고DB module
const {MongoClient} = require("mongodb");

// body parser module
const body_parser = require("body-parser");

// router module


// Express object 생성
const app = express();
// set method : express 내부에 여러 값을 설정(주로 설정값)
app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views" + __dirname + "/views");
app.use(express.static(__dirname +"/public"));
app.use(body_parser.urlencoded({extended:false}));

const webRouter = require("./router/web")(app);

app.use("/web", webRouter); // 요청이 / web/* -> router가 처리


app.get("/", (req, resp) =>{    
    console.log("[GET] / :")
    // // http module의 전송 방식
    // resp.writeHeader(200, {"Content-Type": "text/html;charset=UTF8"});
    // resp.write("Express Welcomes You");
    // resp.end();

    // express의 응답 방식
    resp.status(200)
    .header("Content-Type", "text/html;charset=UTF8")
    .send("Express Welcomes You");

});

// Get 요청 parameter의 처리 : URL Query String 처리
// url?key1=val1&key2=val2

app.get("/query", (req, resp) =>
    {
        console.log("[GET] /query :", req.query);
        // name parameter received
        let name = req.query.name;
        if (name === undefined || name.length == 0){
            //error
            resp.status(404).contentType("text/plain;charset=UTF8").send("이름을 확인할 수 없어요.");
        }else{
            resp.status(200)
        .contentType("text/plain;charset=UTF8")
        .send("Name:" + name);
        }
        
    });

/// parameter 받겟다고 명시한 상태에서는 무조건 넘겨주지 않으면 오류난다.
app.get("/urlparam/:name", (req, resp) => {
    
    console.log(req.cookies);    
    //let name = req.params.name;
    if (req.params.name != undefined){
        // resp.status(200)
        // .contentType("text/html;charset=utf8")
        // .send("<h1>Name:" + name + "</h1>").send("<p>URL 파라미터로 전달 받았습니다. </p>");
        // send 중복 시 오류 발생

        resp.writeHead(200, {"Content-Type": "text/html;charset=UTF8"});
        resp.write("<h1>Name:" + name + "</h1>");
        resp.write("<p>URL 파라미터로 전달 받았습니다. </p>");
        resp.end();
    }else{
        resp.status(404)
            .contentType("text/html;charset=utf8")
            .send("<p>URL 파라미터를 확인할 수 없습니다. </p>");
    }
    
});
// view engine을 이용한 템플릿 렌더링
app.get("/render",(req,resp) =>{
    resp.status(200)
    .contentType("text/html;charset=UTF8")
    .render("render"); //render.ejs 템플릿을 렌더링
});


function startExpress(){    
    http.createServer(app).listen(app.get("port"), () => {
        console.log("Web Server is running on port ", app.get("port"));
        
    });
}

//startExpress(); //express 실행

function startServer(){
    // DB 연결
    const url = "mongodb://192.168.1.118:27017";

    MongoClient.connect(url, {useUnifiedTopology:true} ).then(
        client => {
            const db = client.db("mydb");
            console.log("db",db);
            // express app에 mongodb connection setting
            app.set("db", db);
            startExpress();
        }
    ).catch(err => {
        console.error(err);
    })

}
startServer();

