// expressjs 
// 빠르고 조건없고 가장 소형의 nodejs를 위한 webframwork 
// 라고 말하고 있다.

// 외부 모듈이니 node install express 로 설치해주어야 한다.
// 기본적으로 express의 생성자를 통한 instance 를 app 라는 이름의 참조
// 명으로 붙인다.

function express01(){
    var express =require("express")
    var app = express()    
}

// routing 방법은 app에 정의된 method가 http의 그것과 이름이 같다.

function routingEx1(){
    const express = require("express");
    const app = express();

    // get(url, callback)
    app.get('/', function(req, res){
        res.send('Get 메시지를 받았다.');
        //send()안에는 regular expression도 사용 가능하다
    });
    // post(url, callback)
    app.post('/', function(req, res){
        res.send("Post message를 받았다.");
        res.send(req.params); // request의 데이터
    });
    
    // 모든 request의 요청을 받으며 주로 middleware로써 활용한다.
    app.all('serect', function(req, res, next){
        console.log('Accessing the secret section...');
        next(); // 남아있는 route 가 있을 경우 사용가능하다.
                // all은 middle니까 사용가능
                // 다른 곳에서는 에러 조심
    });
}

// 여기서는 routing method에 함수를 middleware로 사용가능하다는 것을 보여주겠다.
function routingEx2(){
    const express = require("express");
    const app = express();

    let cb0 = function(req, res, next){
        console.log('CB0');
        next();
    }
    let cb1= function(req, res, next){
        console.log("CB1");
        next();
    }
    app.get('/exmaple/d', [cb0,cb1],function(req,res,next){
        console.log('the response will be sent by the next function ...');
        next();
    }, function(req, res){
        res.send("Hello from D");
    } );
    // 위와 같이 함수를 작성하고 집어넣으면
    // 해당 함수들을 거친 뒤에 함수 get의 함수로 돌아오고 next를 하면
    // 그다음에 작성된 함수 실행으로 넘어가게 된다.
}

// express.Router 는 complete middleware and routing system 의 instance 이다.

function expressRouterEx1(){
    let express = require("express");
    let router = express.Router();

    // router는 function을 middleware로 사용하기 위해 추가가 가능하다.
    router.use(function timeLog(req, res, next){
        console.log("Time:", Date.now());
        next();
    });

    router.get('/', function(req, res){
        res.send("Birds home page");
    });
    router.get('/', function(req, res){
        res.send("About birds");
    });
}
// response 의 주요 method는 다음과 같다.

// Method	Description
// res.download()  : Prompt a file to be downloaded.
// res.end()	   : End the response process.
// res.json()	   : Send a JSON response.
// res.jsonp()	   : Send a JSON response with JSONP support.
// res.redirect()  : Redirect a request.
// res.render()	   : Render a view template.
// res.send()	   : Send a response of various types.
// res.sendFile()  : Send a file as an octet stream.
// res.sendStatus(): Set the response status code and send its string representation as the response body.

