// express와 http를 가지고 실제 서버를 구동해 보자

// 우선 서버는 express instance를 middleware로 사용하는게 수월하다.
// 그래야 express에 많은 middleware를 담을 수 있으니까?

const express = require("express");
const app = express();
const http = require("http");
// 서버 구동
function startExpress(){
    http.createServer(app).listen(app.get("port",), () => {
        console.log("web Server is running on port ", app.get("port"));
    });
}
// 이제 server를 구동하기위한 express의 setting 값들을 알아보자
//  app.set()에 설정값에 맞추어 parameter를 주어 설정하며, 주로 setting 하는 값들은 다음과 같다.
// 기본 설정
// port : app.set('port', 포트번호)

// proxy 설정 관련
// trust proxy : loopbackm, linklocal, uniquelocal 등의 옵션을 줄 수 있다.
//app.set('trust proxy', option, callback(ip){})
    // Specify a subnet and an address:
    // app.set('trust proxy', 'loopback, 123.123.123.123')
    // Specify multiple subnets as CSV:
    // app.set('trust proxy', 'loopback, linklocal, uniquelocal')
    // Specify multiple subnets as an array:
    // app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
// 특정 ip를 이용할 경우 callback에 사용하면 된다.


// 외부 module 관련
// query parser : 외부의 query parser module을 사용하며 option 없이 객체만 들어간다.
// "view engine" : view 에 외부 모듈을 이용하는 것인데 
//                 설정하게되면 외부 모듈로 사용할 페이지가 들어있는 dir을 지정해주어야한다.
//                  app.set(views + __dirname + /views_path); 


// 이제 setting을 해본다.
app.set('port', 3000);
app.set('view engine', 'ejs')
// ejs : nodejs에서 자주쓰는 view engine
app.set("views" + __dirname + "/views");
// __dirname : 현재 directory 주소에 대한 built-in 변수

// app.use : 특정 path에서 사용하거나 동작할 middleware를 설정할 수 있다.
app.use(express.static(__dirname+"/public"));
//  express.static : 설정한 경로 이외의 요청은 전부 static에서 설정한
//                   경로에서 처리한다.

const {body_parser} = require("body-parser");
app.use(body_parser.urlencoded({extended:false}));
// body_parser: query parsing 할 때 사용 하는 모듈 중 하나

// 이제 서버를 구동한다. 
startExpress();
// 다음파일에서는 으로는 mongo db 연결을 해보겠다.