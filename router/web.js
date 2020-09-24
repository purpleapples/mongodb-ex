const express = require("express");
const router = express.Router();


module.exports = (app) => {
    // 내부 router를 처리
    router.get( ["/friends/list", "/friends/"], (req, resp) => {
        // resp.status(200).send("<h1>Friends List </h1>");
        let db = app.get("db");
        db.collection("friends")
          .find()
          .toArray()
          .then(result => {
              console.log(result);
              resp.render("friends_list", {friends: result});
          }
          ).catch(err => {
              resp.status(500)
              //console.error(err);
          });
    });
    // 작성 form page
    router.get("/friends/new", (req, resp) =>{
        resp.status(200).render("friends_insert_form");
    });

    router.post("/friends/save", (req, resp) => {
        //console.log("전송된 BODY", req.body);
        let document = req.body;
        let db = app.get("db");
        db.collection("friends").insert(document).then(
            result =>{
                console.log(result);
                resp.redirect("/web/friends/list");                
            }
        ).catch( err => {
            console.error(err);
        })
    });
    return router;
    
}