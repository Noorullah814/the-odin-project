import Tree from "./tree.js";

// Helper to generate an array of random integers < max
function generateRandomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Helper to collect traversal output cleanly
function collectTraversal(tree, methodName) {
  const result = [];
  tree[methodName]((value) => result.push(value));
  return result.join(", ");
}

// 1. Create a balanced BST from random numbers < 100
const randomNumbers = generateRandomArray(15, 100);
console.log("Initial random array:", randomNumbers);

const bst = new Tree(randomNumbers);
console.log("\n--- 1. Initial Balanced Tree ---");
bst.prettyPrint();

// 2. Confirm the tree is balanced
console.log("\nIs balanced?:", bst.isBalanced()); // true

// 3. Print all elements in level, pre, post, and in order
console.log("\n--- 2. Traversals (Initial Balanced) ---");
console.log("Level-order:", collectTraversal(bst, "levelOrderForEach"));
console.log("Pre-order:  ", collectTraversal(bst, "preOrderForEach"));
console.log("Post-order: ", collectTraversal(bst, "postOrderForEach"));
console.log("In-order:   ", collectTraversal(bst, "inOrderForEach"));

// 4. Test lookup, metrics, and deletion on existing values
const sampleValue = bst.root.data;
console.log("\n--- 3. Lookup & Metrics Check ---");
console.log(`includes(${sampleValue}):`, bst.includes(sampleValue)); // true
console.log("includes(9999):", bst.includes(9999)); // false
console.log(`height(${sampleValue}):`, bst.height(sampleValue));
console.log(`depth(${sampleValue}):`, bst.depth(sampleValue)); // 0

// 5. Unbalance the tree by inserting numbers > 100
const unbalancingNumbers = [105, 120, 145, 180, 210, 250];
for (const num of unbalancingNumbers) {
  bst.insert(num);
}

console.log("\n--- 4. After Inserting Numbers > 100 ---");
bst.prettyPrint();

// 6. Confirm the tree is now unbalanced
console.log("\nIs balanced?:", bst.isBalanced()); // false

// 7. Rebalance the tree
bst.rebalance();
console.log("\n--- 5. After Rebalancing ---");
bst.prettyPrint();

// 8. Confirm the tree is balanced again
console.log("\nIs balanced?:", bst.isBalanced()); // true

// 9. Print all elements in level, pre, post, and in order after rebalancing
console.log("\n--- 6. Traversals (Post-Rebalance) ---");
console.log("Level-order:", collectTraversal(bst, "levelOrderForEach"));
console.log("Pre-order:  ", collectTraversal(bst, "preOrderForEach"));
console.log("Post-order: ", collectTraversal(bst, "postOrderForEach"));
console.log("In-order:   ", collectTraversal(bst, "inOrderForEach"));

// 10. Test deleteItem and missing callback error handling
console.log("\n--- 7. Deletion & Error Handling ---");
bst.deleteItem(180);
console.log("includes(180) after deleteItem(180):", bst.includes(180)); // false

try {
  bst.inOrderForEach();
} catch (err) {
  console.log("Caught expected callback error:", err.message);
}