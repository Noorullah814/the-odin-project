const fibs = require("./fibs");
const fibsRec = require("./fibsRec");
const mergeSort = require("./mergeSort");

console.log("fibs(0):", fibs(0)); 
console.log("fibs(1):", fibs(1)); 
console.log("fibs(2):", fibs(2)); 
console.log("fibs(8):", fibs(8)); 

console.log("fibsRec(0):", fibsRec(0)); 
console.log("fibsRec(1):", fibsRec(1)); 
console.log("fibsRec(2):", fibsRec(2)); 
console.log("fibsRec(5):", fibsRec(5)); 
console.log("fibsRec(8):", fibsRec(8)); 

console.log("mergeSort([]):", mergeSort([]));
console.log("mergeSort([73]):", mergeSort([73]));
console.log("mergeSort([1, 2, 3, 4, 5]):", mergeSort([1, 2, 3, 4, 5]));
console.log("mergeSort([3, 2, 1, 13, 8, 5, 0, 1]):", mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log("mergeSort([105, 79, 100, 110]):", mergeSort([105, 79, 100, 110]));
