let car = {
    brand : [
        {
            "BMW" : "M3 GTR",
            "Toyota" : "Avanza"
        },
        {
            "Toyota" : "Veloz"
        }
    ]
}

let myCar1 = car.brand[0].Toyota;
let myCar2 = car.brand[1].Toyota;
console.log(myCar1);
console.log(myCar2);