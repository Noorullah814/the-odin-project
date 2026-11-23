import HashMap from "./src/hashMap.js";

// 1. Empty map edge cases
const emptyMap = new HashMap();
console.log("--- 1. Empty Map Edge Cases ---");
console.log("length():", emptyMap.length()); // 0
console.log("get('apple'):", emptyMap.get("apple")); // undefined
console.log("has('apple'):", emptyMap.has("apple")); // false
console.log("remove('apple'):", emptyMap.remove("apple")); // false
console.log("keys():", emptyMap.keys()); // []
console.log("values():", emptyMap.values()); // []
console.log("entries():", emptyMap.entries()); // []

// 2. Populate to full load factor (12 / 16 = 0.75)
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("\n--- 2. Full Capacity (Load = 0.75) ---");
console.log("length():", test.length()); // 12
console.log("capacity:", test.capacity); // 16
console.log("current load:", test.length() / test.capacity); // 0.75

// 3. Overwrite existing keys while full (should NOT trigger resize)
test.set("apple", "crimson");
test.set("banana", "gold");
test.set("lion", "amber");

console.log("\n--- 3. Overwriting Existing Keys at 0.75 Load ---");
console.log("get('apple'):", test.get("apple")); // crimson
console.log("get('banana'):", test.get("banana")); // gold
console.log("get('lion'):", test.get("lion")); // amber
console.log("length() (still 12):", test.length()); // 12
console.log("capacity (still 16):", test.capacity); // 16

// 4. Trigger dynamic resizing with 'moon'
test.set("moon", "silver");

console.log("\n--- 4. After Adding 'moon' (Dynamic Resize Triggered) ---");
console.log("length():", test.length()); // 13
console.log("new capacity:", test.capacity); // 32
console.log("new load:", test.length() / test.capacity); // 0.40625

// 5. Overwrite after resize & test all methods
test.set("moon", "pearl");
test.set("carrot", "deep orange");

console.log("\n--- 5. All Methods Post-Resize ---");
console.log("get('moon'):", test.get("moon")); // pearl
console.log("get('carrot'):", test.get("carrot")); // deep orange
console.log("has('jacket'):", test.has("jacket")); // true
console.log("has('ufo'):", test.has("ufo")); // false
console.log("remove('frog'):", test.remove("frog")); // true
console.log("remove('frog') again:", test.remove("frog")); // false
console.log("has('frog') after remove:", test.has("frog")); // false
console.log("length() after remove:", test.length()); // 12
console.log("keys():", test.keys());
console.log("values():", test.values());
console.log("entries():", test.entries());

// 6. Bounds check & clear()
try {
  test.checkBounds(99);
} catch (err) {
  console.log("\n--- 6. Bounds Check & Clear ---");
  console.log("Caught expected bounds error:", err.message);
}

test.clear();
console.log("length() after clear():", test.length()); // 0
console.log("entries() after clear():", test.entries()); // []