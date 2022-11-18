var prompt = require('prompt-sync')();

//get input from user

var x = prompt('Imput first number : ');
var y = prompt('Input second number : ');
var z = Number(x) + Number(y);

console.log("Hasil penjumlahan nya adalah : " + z);