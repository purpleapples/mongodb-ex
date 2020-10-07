const mdbConn = require("./connection_to_mariadb.js");
const express = require("express");
const app = express();

mdbConn.GetUserList()
       .then(rows =>{
           console.log(rows);
       }).catch(err =>{
           console.error(err);
       });

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`listening on ${port}`);
})
