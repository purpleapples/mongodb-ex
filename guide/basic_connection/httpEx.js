const { dir } = require("console");
const { request } = require("express");


// 원시적인 방법
// 1. http instance를 생성 
// 2. server instance 생성
// 3. server listener 동작. listen method 이용
// 4. server.on method 를 통해 request 에 대한 이벤트처리 기술
// 5. client에게 보낼 데이터 response 에 기술하고 end
function serverEx1(){
    const http = require("http");

    const server = http.createServer();
    const port = 9999;
    const ip = "127.0.0.1";
    server.listen(port, ip, function(){
        console.log("http has been connected .....");
    });
    // 
     server.on('request', function(req, res){

         res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
         res.write("<html>");
         res.write(" <head>");
         res.write(" <title>node JS Web Test</title>");
         res.write(" </head>");
         res.write(" <body>");
         res.write(" <h1> node JS 응답 페이지 입니다.</h1>");
         res.write(" </body>");
         res.write("</html>");
         res.end();
     });
}

// 현대적인 방법 1
// 1. http instance 생성
// 2. createServer 하고 바로 callback으로 작성 시작
function ModernHttpEx1(){
    const http = require("http");
    // 1번 방법
    const server = http.createServer((request, reponse) => {
        // code here

    });
    // 여기서 createServer 가 반환한 Server object는 EventEmitter 
}


// 2번 방법
function httpEx2(){
    const server = http.createServer();

    server.on('request', (request,response) =>{
        // code here
    });
    // 요청을 실제로 처리하려면 listen method가 server 객체에서 
    // 호출되어야 한다. 대부분은 port 번호만 listen에 전달되면 된다.
}

function requestEx(){
    const http = require("http");
    const server = http.createServer();
    const request = server.request

    // request에서 method, url, header  객체 꺼내오기
    const {method, url} = request;
    // 여기서 request 는 IncomingMessage의 instance이다.
    // method는 일반적인 HTTP의 그것이고,
    // url은 server, protocol, port 를 제외한것
    const {headers} = request;

    // request body 찾기
    let body = [];
    http.request.on('data',(chunk)=>{
        body.push(chunk);
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();
    });

    // handler 에 전달된 request 객체는 ReadableStream interface를 구현
    // 이 stream에 event listner를 등록하거나 다른 stream에 event listner를
    // 등록해서 데이터를 받을 수 있다.

    // 각 data even에서 발생시킨 chunk는 Buffer이다. 
    // 그러므로 위처럼 array에 수집하고 end event에 이어 붙인 뒤 
    // 문자열로 만드는것이 가장 좋은 방법 중 하나.
}

// 에러 처리 할 경우 error에 대한 event가 없다면 node.js 종료될지도 모른다.
function requestErr(){
    const {http} = require("http")
    const server = http.createServer();
    const request = server.request
    request.on('error', (err) => {
        console.error(err.stack);
    });        
}

// 종합

function summary(){
    const http = require('http');

    http.createServer((request, response) =>{
    const {headers, method, url} = request;
    let body = [];
    request.on('error', (err) =>{
        console.error(err);
    }).on('data', (chunk) =>{
        body.push(chunk);
    }).on('end', () =>{
        body = Buffer.concat(body).toString();
    });
    }).listen(8080); // 해당 서버를 활성화 하고 8080 포트로 받는다.
}

// reponse 객체 다루기 예제

function responseSummary(){
    const http = require("http");

    http.createServer((request, response) => {
        const {headers, method, url} = request;
        let body = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }
    ).on('end', () =>{
        body = Buffer.concat(body).toString();
        
        // response 다루기 start!

        response.on('error', (err) => {
            console.error(err);            
        });

        response.statusCode = 200; // HTTP response 코드 추가
        response.setHeader('Content-Type', 'application/json');// 헤더 추가
        // 아래와 같이 대체 가능
        // response.writeHead(200, {'content-Type': 'application/json'})

        const repsonseBody  = {headers, method, url, body}; // reponse body 생성

        reponse.write(JSON.stringify(responseBody)); // json 으로 변경
        response.end(); 

    });
}).listen(8080);
}

//pipe 사용 테스트
// request는 ReadableStream(요청 읽는거), response WritableStream(요청 보낼거)
// 이 둘을 연결 시켜 보겠다.

function pipeEx(){
    const http = require('http');

    http.createServer((request, response) => {
      request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
      });
      response.on('error', (err) => {
        console.error(err);
      });
      if (request.method === 'POST' && request.url === '/echo') {
        request.pipe(response);
      } else {
        response.statusCode = 404;
        response.end();
      }
    }).listen(8080);

}