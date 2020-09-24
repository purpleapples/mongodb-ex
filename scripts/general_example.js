// 외부 모듈 불러오기
const Ticker = require("../modules/ticker");

let seconds = 0;
let ticker = new Ticker(process);
// Event listener 부착

process.on("tick", ()=>{
   // tick event를 받으면 listner를 수행(callback) 
   seconds++;
   console.log(seconds, "초가 지났습니다.");

   if(seconds >10){
        ticker.emit("stop");
   }
});

ticker.start();