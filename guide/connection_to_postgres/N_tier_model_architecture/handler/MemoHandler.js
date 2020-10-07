// model을 실제로 사용하는 handler 

const MemoModel = require("../model/MemoModel")


class MemoHandler{

    constructor(){
        this.model = new MemoModel();
    }

    create (req, res){
        let memo = req.body;

        this.model.create(memo)
                  .then(data =>{
                      res.send(JSON.stringify(data));
                  })
                  .catch(err =>{
                      res.send(JSON.stringify({msg: err}));
                  });
    }

    read(req, res){
        let id = req.params.id;

        this.model.read(id)
                  .then(data =>{
                      res.send(JSON.stringify(data));
                  })
                  .catch( err =>{
                      res.send(JSON.stringify({msg: err}));
                  });
    }

    readAll(req, res){
        this.model.readAll()
                  .then(data =>{
                      res.send(JSON.stringify(data));
                  })
                  .catch( err=> {
                      res.send(JSON.stringify({msg : err}));
                  });
    }

    update(req, res, body){
        let id = req.params.id;
        let memo = req.body;

        this.model.update(id, memo)
                  .then(data=>{
                      res.send(JSON.stringify(data));
                  })
                  .catch( err=> {
                    res.send(JSON.stringify({msg : err}));
                  });
    }

    delete(req, res, body){
        let id = req.params.id;

        this.model.delete(id)
                  .then(data=>{
                    res.send(JSON.stringify(data));
                  })
                  .catch( err=> {
                  res.send(JSON.stringify({msg : err}));
                  });
    }
}

module.exports = MemoHandler;
