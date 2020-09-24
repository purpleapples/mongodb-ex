
// oldschool --------------------------------------

// const test_module1 = require("../modules/test_module1.js");

// const add = test_module1.add;
// const square = test_module1.square;

// console.log("add:", add(10,20));
// console.log("square", square(50));

// ---------------------------------

// state-of-the-art --------------------------------------

const {add, square} = require("../modules/test_module1");
const area = require("../modules/test_module2");
console.log(area.square(5));
console.log(area.circle(10));