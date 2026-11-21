import LinkedList from "./linkedList.js";

// 1. Empty list edge cases
const emptyList = new LinkedList();
console.log("--- Empty List Edge Cases ---");
console.log("size():", emptyList.size()); // 0
console.log("head():", emptyList.head()); // undefined
console.log("tail():", emptyList.tail()); // undefined
console.log("at(0):", emptyList.at(0)); // undefined
console.log("pop():", emptyList.pop()); // undefined
console.log("contains('dog'):", emptyList.contains("dog")); // false
console.log("findIndex('dog'):", emptyList.findIndex("dog")); // -1
console.log("toString():", JSON.stringify(emptyList.toString())); // ""

// 2. The Odin Project official test case
const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log("\n--- TOP Official Test ---");
console.log(list.toString());
// Expected: ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null

// 3. Inspection & Search methods
console.log("\n--- Inspection & Search ---");
console.log("size():", list.size()); // 6
console.log("head():", list.head()); // dog
console.log("tail():", list.tail()); // turtle
console.log("at(2):", list.at(2)); // parrot
console.log("at(99):", list.at(99)); // undefined
console.log("contains('hamster'):", list.contains("hamster")); // true
console.log("contains('lion'):", list.contains("lion")); // false
console.log("findIndex('snake'):", list.findIndex("snake")); // 4
console.log("findIndex('lion'):", list.findIndex("lion")); // -1

// 4. Prepend & Pop
console.log("\n--- Prepend & Pop ---");
list.prepend("wolf");
console.log("After prepend('wolf'):", list.toString());
console.log("pop():", list.pop()); // wolf
console.log("After pop():", list.toString());

// 5. Extra Credit: insertAt & removeAt
console.log("\n--- Extra Credit: insertAt & removeAt ---");
const numList = new LinkedList();
numList.append(1);
numList.append(2);
numList.append(3);
numList.insertAt(1, 10, 11);
console.log("After insertAt(1, 10, 11):", numList.toString());
// Expected: ( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null

numList.removeAt(2);
console.log("After removeAt(2):", numList.toString());
// Expected: ( 1 ) -> ( 10 ) -> ( 2 ) -> ( 3 ) -> null

// 6. RangeError boundary checks
try {
  numList.insertAt(-1, 99);
} catch (err) {
  console.log("Caught expected insertAt error:", err.name, "-", err.message);
}

try {
  numList.removeAt(10);
} catch (err) {
  console.log("Caught expected removeAt error:", err.name, "-", err.message);
}