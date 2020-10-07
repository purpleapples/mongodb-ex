// postgres 연동
 const {Client} = require('pg');

 const client = new Client({
     user:"db사용자명",
     host:"DB주소",
     datagase:"DB명",
     password:"비밀번호",
     port: 8980
 });

 client.connect();

 client.query("SELECT NOW()", (err, res) => {
     console.log(err, res);
     client.end();
     
 });

 client.connect();

 const sql = "insert into user value($1,$2,$3,$4,$5) RETURNING *"
 const values = ["1", "2", "3", "4", "5"]
 client.query(sql, values, (err, res) => {
     if (err){
         console.log(err.stacfk);
     }else{
         console.log(res.rows[0])
     }
 })

// 현대 식 
// npm install pg-promise

const pgp = require("pg-promise")();
const db = pgp("postgres://testdb:testdb@host:9999/dbname");

db.one("SELECT $1 AS value", 123)
 .then( data =>{
     console.log("DATA:", data.value);
 }).catch(err=>{
     console.error("ERROR:", err);
 });

 