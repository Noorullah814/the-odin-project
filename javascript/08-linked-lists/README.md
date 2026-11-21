# Linked Lists — The Odin Project

A JavaScript implementation of a **Singly Linked List** built as part of [The Odin Project's JavaScript curriculum](https://www.theodinproject.com/lessons/javascript-linked-lists).

This project focuses on understanding fundamental computer science data structures, node references, traversal, insertion, deletion, and searching without relying on JavaScript's built-in array methods.

## Features

### Core Functionality

- **append(value)** – Adds a new node containing the given value to the end of the list.
- **prepend(value)** – Adds a new node to the beginning of the list.
- **size()** – Returns the total number of nodes.
- **head()** – Returns the value of the first node.
- **tail()** – Returns the value of the last node.
- **at(index)** – Returns the value of the node at the specified index.
- **pop()** – Removes the first node and returns its value.
- **contains(value)** – Checks whether a given value exists in the list.
- **findIndex(value)** – Returns the index of the first node containing the specified value.
- **toString()** – Converts the linked list into a readable string representation.

### Extra Credit

- **insertAt(index, ...values)** – Inserts one or multiple new nodes at the specified index.
- **removeAt(index)** – Removes the node at the specified index.

Both extra-credit methods throw a `RangeError` when the index is out of bounds.

## Project Structure

```text
linked-lists/
│
│── node.js
│── linkedList.js
├── main.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (ES module support).
- Git (optional, for cloning the repository).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Noorullah814/the-odin-project.git
```

2. Navigate to the Linked Lists project directory:

```bash
cd "the-odin-project/JavaScript/linked-lists"
```

*Adjust the directory path if your project is organized differently.*

3. Ensure your `package.json` includes:

```json
{
  "type": "module"
}
```

4. Run the project:

```bash
node main.js
```

No external dependencies are required.

## Usage

Import the `LinkedList` class and create a new instance:

```javascript
import LinkedList from "./src/linkedList.js";

const list = new LinkedList();

// Add elements
list.append("dog");
list.append("cat");
list.append("parrot");

// Add an element at the beginning
list.prepend("hamster");

// Display the linked list
console.log(list.toString());

// Check the list size
console.log(list.size());

// Access elements
console.log(list.head());
console.log(list.tail());
console.log(list.at(2));

// Search for elements
console.log(list.contains("cat"));
console.log(list.findIndex("parrot"));

// Remove the first node
console.log(list.pop());

// Insert multiple elements
list.insertAt(1, "rabbit", "turtle");

// Remove a node at a specific index
list.removeAt(2);

// Display the updated list
console.log(list.toString());
```

### Example Output

```text
( hamster ) -> ( dog ) -> ( cat ) -> ( parrot ) -> null
```

## Linked List Structure

A singly linked list consists of nodes connected through references.

Each node contains:

- `value` – Stores the data.
- `nextNode` – References the next node in the list.

The linked list maintains a reference to its first node, known as the head. The last node points to `null`.

```text
Head
 |
 v
[ dog | next ] -> [ cat | next ] -> [ parrot | null ]
```

## Edge Cases & Error Handling

The implementation handles several important edge cases:

- Empty linked lists.
- Accessing nodes using invalid indexes.
- Removing nodes from an empty list.
- Lists containing only one node.
- Searching for values that don't exist.
- Duplicate values.
- Inserting multiple nodes at once.
- Invalid indexes in `insertAt()` and `removeAt()`.

## Concepts Practiced

- JavaScript classes and constructors.
- ES6 modules (`import` / `export`).
- Objects and references.
- Singly linked list data structures.
- Node traversal using loops.
- Dynamic insertion and deletion.
- Searching and accessing elements.
- Rest parameters (`...values`).
- Error handling with `RangeError`.
- Understanding time complexity.

## Learning Resource

This project was completed as part of [The Odin Project – JavaScript: Linked Lists](https://www.theodinproject.com/lessons/javascript-linked-lists).

## 👨‍💻 Author

**Noor Ullah**

- GitHub: [Noorullah814](https://github.com/Noorullah814)
- Repository: [The Odin Project](https://github.com/Noorullah814/the-odin-project)

---

*Part of my journey through The Odin Project's Full Stack JavaScript curriculum.*