const util = require("util");
const {EventEmitter}  = require("events");

let ticker_target = null;
let ticker = null;

// on, emit 사용 위해 EventEmitter를 상속
const Ticker = function(target){
    ticker_target = target;
    
    // event listener 
    this.on("stop", ()=>
                        {
                            clearInterval(ticker)                        
                        }
    );
}

// protype 영역에 common method 작성
Ticker.prototype.start = () =>{
    // setInterval(callback, ms); // ms마다 callback 실행
    //      -> clearInterval(timer) : timer reset
    // setTImeout(callback, ms); // ms 이후 callback 실행    
    ticker =setInterval(() => {
        // 1초마다 ticker_target으로 tick message 전송
        ticker_target.emit("tick");
    },1000);
}

// Node의 util 패키지로 EventEmitter의 prototype을 상속
util.inherits(Ticker, EventEmitter);

// Ticker 모듈 내보내기
module.exports = Ticker;