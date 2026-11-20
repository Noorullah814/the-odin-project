# Recursion – Fibonacci & Merge Sort

This project is part of [The Odin Project – JavaScript Course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript).

The goal of this project is to understand and practice **recursion** in JavaScript by implementing two classic algorithms: the Fibonacci sequence and Merge Sort.

## 📌 Project Overview

This project demonstrates two approaches to generating the Fibonacci sequence and a recursive implementation of the Merge Sort algorithm.

### 1. Fibonacci Sequence

The Fibonacci sequence is a series of numbers in which each number is the sum of the two preceding numbers.

Starting with `0` and `1`, the sequence looks like this:

```javascript
[0, 1, 1, 2, 3, 5, 8, 13]
```

Two implementations are included:

- **Iterative Fibonacci (`fibs.js`):** Generates the sequence using a loop.
- **Recursive Fibonacci (`fibsRec.js`):** Generates the sequence using recursive function calls and base cases.

### 2. Merge Sort

Merge Sort is a sorting algorithm based on the **Divide and Conquer** approach.

It works in three main steps:

1. **Divide:** Split the array into two smaller halves.
2. **Conquer:** Recursively sort both halves until each contains zero or one element.
3. **Combine:** Merge the sorted halves into a single sorted array.

The implementation uses two functions:

- `mergeSort(array)` – Recursively divides and sorts the array.
- `merge(left, right)` – Combines two sorted arrays into one sorted array.

## 🛠️ Technologies Used

- JavaScript (ES6+)
- Node.js
- Recursion
- Array Methods (`slice()`, `concat()`)
- Git & GitHub

## 📂 Project Structure

```text
07-recursion/
│
├── fibs.js          # Iterative Fibonacci implementation
├── fibsRec.js       # Recursive Fibonacci implementation
├── mergeSort.js     # Recursive Merge Sort implementation
└── index.js         # Main file for testing all functions
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Basic knowledge of JavaScript.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Noorullah814/the-odin-project.git
```

2. Navigate to the project directory:

```bash
cd the-odin-project/javascript/07-recursion
```

### Run the Project

Execute the following command:

```bash
node index.js
```

The program will run the Fibonacci and Merge Sort implementations and display their results in the terminal.

## 🧪 Example Usage

### Iterative Fibonacci

```javascript
fibs(8);
```

Output:

```javascript
[0, 1, 1, 2, 3, 5, 8, 13]
```

### Recursive Fibonacci

```javascript
fibsRec(8);
```

Output:

```javascript
[0, 1, 1, 2, 3, 5, 8, 13]
```

### Merge Sort

```javascript
mergeSort([3, 2, 1, 13, 8, 5, 0, 1]);
```

Output:

```javascript
[0, 1, 1, 2, 3, 5, 8, 13]
```

Another example:

```javascript
mergeSort([105, 79, 100, 110]);
```

Output:

```javascript
[79, 100, 105, 110]
```

## 📊 Algorithm Complexity

| Algorithm | Time Complexity | Space Complexity |
|---|---|---|
| Iterative Fibonacci | O(n) | O(n) |
| Recursive Fibonacci (array-building approach) | O(n) | O(n) |
| Merge Sort | O(n log n) | O(n) |

*Space complexity includes the output and temporary arrays where applicable.*

## 🎯 Learning Outcomes

Through this project, I practiced:

- Understanding recursion and recursive function calls.
- Identifying and implementing base cases.
- Understanding the relationship between iterative and recursive solutions.
- Applying the Divide and Conquer strategy.
- Splitting arrays into smaller subarrays.
- Merging sorted arrays efficiently.
- Understanding algorithm time and space complexity.
- Testing functions with different input cases.

## 📚 Learning Resources

- [The Odin Project – Recursion](https://www.theodinproject.com/lessons/javascript-recursion)

## 👨‍💻 Author

**Noor Ullah**

- GitHub: [Noorullah814](https://github.com/Noorullah814)
- Repository: [The Odin Project](https://github.com/Noorullah814/the-odin-project)

---

*Part of my journey through The Odin Project's Full Stack JavaScript curriculum.*