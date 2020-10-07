const express = require("express")
const app = express();

const MemoHandler = require("./handler/MemoHandler")

const port = 3100;

const memoHandler = new MemoHandler();

app.use(express.json());

app.get("/memo", memoHanlder.readAll.bind(memoHandler));
app.get("/memo/:id", memoHanlder.read.bind(memoHandler));
app.put("/memo", memoHanlder.create.bind(memoHandler));
app.post("/memo:id", memoHanlder.update.bind(memoHandler));
app.delete("/memo:id", memoHanlder.delete.bind(memoHandler));

app.listen(port, ()=>{
    console.log(`listen port : ${port}`);
});