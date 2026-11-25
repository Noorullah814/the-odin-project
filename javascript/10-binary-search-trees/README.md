# Binary Search Trees — The Odin Project

A JavaScript implementation of a **Binary Search Tree (BST)** built as part of [The Odin Project](https://www.theodinproject.com/).

This project focuses on understanding tree-based data structures, recursion, tree traversal algorithms, and maintaining balanced binary search trees.

## Features

### Tree Construction

- **Node class** – Represents a tree node containing data and references to its left and right children.
- **Tree constructor** – Builds a balanced Binary Search Tree from an array of numbers.
- Automatically removes duplicate values.
- Sorts the input array before constructing a balanced tree using recursion.

### Core Methods

- **insert(value)** – Inserts a new value while maintaining the BST property.
- **deleteItem(value)** – Removes a node while maintaining the BST structure.
- **includes(value)** – Checks whether a value exists in the tree.
- **prettyPrint()** – Displays the tree structure in the console.

### Tree Traversals

All traversal methods accept a callback function:

- **levelOrderForEach(callback)** – Visits nodes level by level using a queue.
- **inOrderForEach(callback)** – Visits nodes in left-root-right order.
- **preOrderForEach(callback)** – Visits nodes in root-left-right order.
- **postOrderForEach(callback)** – Visits nodes in left-right-root order.

### Tree Measurements

- **height(value)** – Returns the height of the node containing the given value.
- **depth(value)** – Returns the depth of a node from the root.

### Balance Operations

- **isBalanced()** – Checks whether the tree is balanced.
- **rebalance()** – Rebuilds the tree into a balanced BST using its sorted values.

## Project Structure

```text
binary-search-trees/
│
├── node.js
├── tree.js
├── main.js
└── README.md
```

## How It Works

### 1. Binary Search Tree Property

A Binary Search Tree follows a simple rule:

- Values smaller than a node are placed in its left subtree.
- Values greater than a node are placed in its right subtree.

This structure makes searching, inserting, and deleting values efficient when the tree is balanced.

### 2. Building a Balanced Tree

The constructor:

1. Removes duplicate values using `Set`.
2. Sorts the remaining values in ascending order.
3. Finds the middle element as the root.
4. Recursively builds the left and right subtrees.

This creates a balanced tree from the initial array.

### 3. Node Deletion

The `deleteItem()` method handles three cases:

- **Leaf node:** Removes a node with no children.
- **One child:** Replaces the node with its existing child.
- **Two children:** Finds the inorder successor (smallest value in the right subtree), replaces the deleted node's value, and removes the successor.

### 4. Tree Traversals

The implementation supports four traversal techniques:

| Traversal | Visiting Order |
|---|---|
| Level-order | Level by level |
| In-order | Left → Root → Right |
| Pre-order | Root → Left → Right |
| Post-order | Left → Right → Root |

In-order traversal of a BST returns values in ascending order.

### 5. Height and Depth

- **Height:** The number of edges on the longest path from a node to a leaf.
- **Depth:** The number of edges from the root to a particular node.

An empty subtree has a height of `-1`, and a leaf node has a height of `0`.

### 6. Balance and Rebalancing

A tree is considered balanced when the height difference between the left and right subtrees of every node is no greater than `1`.

The `isBalanced()` method checks this condition recursively.

The `rebalance()` method collects the tree's values using in-order traversal and rebuilds a balanced tree from those values.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Noorullah814/the-odin-project.git
```

Navigate to the Binary Search Trees project directory inside your cloned repository.

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

## Testing

The `main.js` file demonstrates the following operations:

1. Generates an array of 15 random integers.
2. Builds a balanced Binary Search Tree.
3. Prints the initial tree structure.
4. Checks whether the tree is balanced.
5. Displays all four traversal results.
6. Tests value lookup, height, and depth.
7. Inserts larger values to create an unbalanced tree.
8. Checks the balance status again.
9. Rebalances the tree.
10. Verifies that the tree is balanced after rebalancing.
11. Tests deletion and callback error handling.

The random input array may produce different tree structures and traversal results on each execution.

## Concepts Practiced

- Binary Search Trees
- Tree Data Structures
- Recursion
- Private Class Methods
- Node Relationships
- Tree Insertion and Deletion
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Level-order Traversal
- In-order, Pre-order, and Post-order Traversals
- Queues
- Tree Height and Depth
- Balanced Trees
- Inorder Successor
- Tree Rebalancing
- JavaScript Classes and Callbacks

## Learning Resource

This project was completed as part of [The Odin Project — Binary Search Trees](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

## 👨‍💻 Author

**Noor Ullah**

- GitHub: [Noorullah814](https://github.com/Noorullah814)
- Repository: [The Odin Project](https://github.com/Noorullah814/the-odin-project)

---

*Part of my journey through The Odin Project's Full Stack JavaScript curriculum.*