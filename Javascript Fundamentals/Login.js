const prompt = require('prompt-sync')();

let validPassword = "Asdf1234";
let password = prompt("Enter a password : ");

if (password === validPassword){
    console.log("Welcome to the page");
} else {
    console.log("Incorrect password, please try again");
}

console.log();
console.log("Thankyou for using this apps..");