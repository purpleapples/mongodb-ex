// 여기서는 mongodb에 crud 작업을 coding 한다.

const {MongoClient} = require("mongodb");
// url은 본인거 쓰세요???
const url = "mongodb://192.168.55.70:27017";

// 하나 입력
function createDocument1(){
    
    MongoClient.connect(url, {useUnifiedTopology=true}).then( client => {
        const db = client.db("mydb"); // 없으면 db 생성된다.
                
        // collection 도 없으면 생성된다.
        let doc = {name:"wayn", job:"chairperson"} 
        // 넘겨주는 형태는 json으로 형태만 맞으면 속성의 추가는 상관없다.

        // insertOne의 parameter는 insert할 json, callback function 이다.
        db.collection("DC").insertOne(doc, (err, result) =>{
                if(err){
                    console.error(err);
                }else{
                    console.log(result);
                    console.log(result.insertedCount, "개의 문서 insert");
                    client.close();
                }
            }
        );
    });
}

// 여러개 입력
function createDocument1(){
    
    MongoClient.connect(url, {useUnifiedTopology=true}).then( client => {
        const db = client.db("mydb"); // 없으면 db 생성된다.
                
        let docList = [];
        let doc1 = {name:"wayn", job:"chairperson"}; 
        let doc2 = {name:"clark Kent", job:"jounalist"}; 
        let doc3 = {name:"arthur curry", job:"no job"}; 
        doclist = [doc1, doc2, doc3];

        // insertMany: 여러개의 json을 list에 입력받고 promise 를 지원한다.
        db.collection("DC").insertMany(doclist).then( result =>{
            console.log(result.insertedCount, "개의 문서가 삽입");
        }).catch(err =>{
            console.error(err);
        });
    });
}

// 조회하기
function readOne(){

    MongoClient.connect(url, {useUnifiedTopology=true}).then(
        client=>{
            const db = client.db('mydb');
            // 조건없이 조회할 경우 가장 최근의 문서만 가져온다.
            db.collection("DC").findOne().then(result =>{
                console.log(result);
            }).catch(err=>{
                console.error(err);
            })
        }
    )
}

// 다량 조회하기 
function readmany(condition, projection){

    MongoClient.connect(url, {useUnifiedTopology=true}).then(
        client=>{
            const db = client.db('mydb');
            // 조건없이 조회할 경우 가장 최근의 문서만 가져온다.
            // 전체 조회를 할 수 있고 조건을 달수도 있다.
            // 그리고 전체 조회 한 이후 편집도 지원한다.
            // find를 간편하게 사용하기 위해서는 array로 변환 후
            // promise를 사용하는것도 한가지 방법이다.
            db.collection("DC").find(
                // 조건 사용법
                // condition 으로 사용할 json 객체 작성
                // projection 으로 사용할 json 객체 작성
                {name:1, job:0}, // 각각의 field를 적고 보일것은
                                 // 1, 안보일 것은 0으로 설정
                {
                    $and:[
                        {name: {$eq:"wayn"}}
                    ]
                }
                // 조건은 상당히 복잡하니 아래의 실행쪽 코드에서 설명
            ).toArray().then(
                result=>{   
                    for (let index = 0; index < result.length; index++) {
                        console.log(result[index]);
                    }
                }
            ).catch(err =>{
                console.error(err);
            });
        }
    );
}

let condition =  {
    $and:[
        {name: {$eq:"wayn"}}
    ]
};
let projection = {name:1, job:0};
// readmany(condition, projection);

// find의 parameter 설명
// find는 condition과 projection 두 가지 parameter를 받으며 json 이다.
// condition 형태 설명
// condition은 {$비교연산자 : [{조건1}, {조건2},...], $비교연산자2 : ...}
// 로 되어있으며 문자형 비교연산자(javascript engine과 동일)를 사용한다.
// 조건 거는 법은 동일한것 찾을 경우는 {field:value} 이지만 연산자를 쓴다면
// {filed :{$연산자:value}} 형태로 넣어야 한다.

// projection 설명
// document의 특정 field를 지정해서 보여줄지말지 여부를 지정한다.
// {field1:1, field2:0,...}
// 저기서 1인 field는 보여주고 0인 field는 안보여준다.


// update 
function testUpdate(condition, doc){
    client.connect().then(client => {
        const db = client.db("mydb");
        // update : condition과 set에 대한 parameter는 json 형태 이다.        
        db.collection("DC").updateMany(condition, {$set:doc})
                           .then(result =>{
                                console.log(result);
                            });
        }
    ).catch(err => console.error(err));
}

let condition = {name:"고길동"};
let doc = {job: "직장인"};

// testUpdate(
//     condition,
//     doc    
// );


// 삭제
function testDeleteAll(){
    // db.collection.delete() : 전체 삭제
    // SQL : DELETE FROM table;
    MongoClient.connect().then(client => {
        const db= client.db("mydb");
        // 원래 condition 넣어줘야 하나 안넣으면 전부 삭제
        db.collection("DC").deleteMany({}).then(
            result => {
                console.log(result.deletedCount, "개의 문서 삭제");
            }
        );

    }).catch(err => {
        console.error(err);
    });
};

// 지금까지 node js를 이용하여 mongodb에 연결 후 사용해 보았고
// 다음은 서버 구동후 mongodb 연결하고 html에 데이터 전송까지 해보겠다.