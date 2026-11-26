import knightMoves from "./knightMoves.js";

function printKnightPath(start, end) {
  const path = knightMoves(start, end);
  const moves = path.length - 1;
  const moveLabel = moves === 1 ? "move" : "moves";

  console.log(
    `\nknightMoves([${start}], [${end}]) => You made it in ${moves} ${moveLabel}! Here's your path:`
  );
  for (const square of path) {
    console.log(`  [${square[0]}, ${square[1]}]`);
  }
}

printKnightPath([0, 0], [1, 2]);
printKnightPath([0, 0], [3, 3]);
printKnightPath([3, 3], [0, 0]);
printKnightPath([3, 3], [4, 3]);
printKnightPath([0, 0], [7, 7]);
printKnightPath([4, 4], [4, 4]);

console.log("\n--- Boundary & Error Check ---");
try {
  knightMoves([0, 0], [8, 8]);
} catch (error) {
  console.log("Caught expected off-board error:", error.message);
}