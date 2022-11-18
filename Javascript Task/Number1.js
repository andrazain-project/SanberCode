const prompt = require('prompt-sync')();

let x = prompt("Input your number : ");
let result = Math.sqrt(x);

if (x <= 0){
    console.log("Can not input Negatif number!");
} else if (x %2 == 0) {
    console.log("The result is : " + result);
} else {
    console.log("Can not input Odd number!");
}