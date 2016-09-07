console.log("This example shows that not any function can be async")
const async = require('async');


console.log("Waiter function uses the CPU for a given amount of time in seconds")

function waiter(secs) {
    const start = new Date().getTime();
    const wait = secs * 1000;
    while (new Date().getTime() < start + wait);
    return wait;
}

console.log("We asyncify the waiter function")
const asyncWaiter = async.asyncify(waiter)

console.log("Let's create an array of size 1000 with 0.05 values")
let array = []
for (let i = 0; i < 1000; i++) {
    array.push(0.05);
}

console.log("Let's map the array with the async version of the waiter function")
console.log("Will we wait 0.05 or 50 seconds? Let's see...")

const start = new Date().getTime();
async.map(array, asyncWaiter, (err, res) => {})
const end = new Date().getTime()

console.log("Ellapsed time: " + ((end - start) / 1000) + " seconds")
