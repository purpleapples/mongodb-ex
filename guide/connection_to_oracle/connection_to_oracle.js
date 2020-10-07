const oracledb = require("oracledb");

oracledb.getConnection({
    user:'user명',
    password:'비밀번호입력',
    host:'localhost',
    database:'db'
}, (err,conn) =>{
    if(err){
        console.error(err);
    }else{
        console.log("connected.....");
    }
})
