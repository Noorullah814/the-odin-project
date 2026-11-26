# Knights Travails — The Odin Project

A JavaScript implementation of the **Knights Travails** problem, built as part of [The Odin Project](https://www.theodinproject.com/).

This project finds the shortest possible path a knight can take between two positions on a standard 8×8 chessboard using the **Breadth-First Search (BFS)** algorithm.

## Features

- **Shortest Path Finding** – Finds the minimum number of moves required for a knight to reach its destination.
- **Breadth-First Search (BFS)** – Uses BFS to explore possible moves level by level and guarantee the shortest path.
- **Valid Knight Moves** – Generates all eight possible knight movement patterns.
- **Board Boundary Validation** – Ensures that every generated position stays within the 8×8 chessboard.
- **Visited Tracking** – Uses a `Set` to prevent revisiting previously explored squares.
- **Path Reconstruction** – Tracks the complete path from the starting square to the destination.
- **Input Validation** – Rejects invalid coordinates and positions outside the chessboard.
- **Edge Case Handling** – Supports identical starting and ending positions.

## Project Structure

```text
knights-travails/
│
├── knightMoves.js
├── main.js
└── README.md
```

## How It Works

### 1. Knight Movement

A knight moves in an L-shaped pattern:

- Two squares horizontally and one vertically.
- Two squares vertically and one horizontally.

There are eight possible movement combinations:

```javascript
const KNIGHT_OFFSETS = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];
```

Each position is represented as an `[x, y]` coordinate, where both values range from `0` to `7`.

### 2. Validating Board Positions

The `isValidSquare()` function checks whether a coordinate:

- Contains two integer values.
- Has an x-coordinate between `0` and `7`.
- Has a y-coordinate between `0` and `7`.

The `getValidMoves()` function generates all possible knight moves and filters out positions outside the board.

### 3. Breadth-First Search (BFS)

The `knightMoves(start, end)` function uses Breadth-First Search to find the shortest path.

The algorithm works as follows:

1. Adds the starting position and its initial path to a queue.
2. Removes the next position from the queue.
3. Checks whether the current position is the destination.
4. Generates all valid knight moves from the current position.
5. Skips positions that have already been visited.
6. Adds each new position to the queue along with its updated path.
7. Continues until the destination is reached.

Since BFS explores positions in increasing order of distance from the starting square, the first path reaching the destination contains the minimum number of moves.

### 4. Path Reconstruction

Each queue entry stores two things:

- The current chessboard position.
- The complete path taken to reach that position.

When the destination is found, the function returns the complete path as an array of coordinates.

### 5. Visited Tracking

A JavaScript `Set` stores visited positions using coordinate strings such as `"2,1"`.

This prevents the algorithm from repeatedly exploring the same square and avoids unnecessary processing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Noorullah814/the-odin-project.git
```

Navigate to the Knights Travails project directory inside your cloned repository.

### 2. Configure ES Modules

Ensure your `package.json` contains:

```json
{
  "type": "module"
}
```

No external dependencies are required.

### 3. Run the Project

```bash
node main.js
```

## Example Usage

Import the `knightMoves()` function:

```javascript
import knightMoves from "./knightMoves.js";

const path = knightMoves([0, 0], [3, 3]);

console.log(path);
```

Example output:

```text
[
  [0, 0],
  [2, 1],
  [3, 3]
]
```

The knight reaches `[3, 3]` from `[0, 0]` in just **2 moves**.

## Testing

The `main.js` file includes test cases covering:

| Starting Position | Destination | Minimum Moves |
|---|---|---:|
| `[0, 0]` | `[1, 2]` | 1 |
| `[0, 0]` | `[3, 3]` | 2 |
| `[3, 3]` | `[0, 0]` | 2 |
| `[3, 3]` | `[4, 3]` | 3 |
| `[0, 0]` | `[7, 7]` | 6 |
| `[4, 4]` | `[4, 4]` | 0 |

Additional testing includes:

- Invalid coordinates outside the chessboard.
- Correct path output.
- Starting and ending at the same position.
- Minimum move calculations.
- Board boundary validation.

## Concepts Practiced

- Graphs and Graph Traversal
- Breadth-First Search (BFS)
- Queues
- Arrays and Nested Arrays
- JavaScript Sets
- Coordinate Systems
- Knight Movement and Chessboard Representation
- Visited Node Tracking
- Shortest Path Algorithms
- Path Reconstruction
- Array Methods (`map()` and `filter()`)
- Input Validation
- ES Modules

## Learning Resource

This project was completed as part of [The Odin Project — Knights Travails](https://www.theodinproject.com/lessons/javascript-knights-travails)

## 👨‍💻 Author

**Noor Ullah**

- GitHub: [Noorullah814](https://github.com/Noorullah814)
- Repository: [The Odin Project](https://github.com/Noorullah814/the-odin-project)

---

*Part of my journey through The Odin Project's Full Stack JavaScript curriculum.*