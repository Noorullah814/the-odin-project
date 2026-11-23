# HashMap & HashSet — The Odin Project

A JavaScript implementation of the **HashMap** and **HashSet** data structures, built as part of [The Odin Project](https://www.theodinproject.com/).

This project focuses on understanding how hash maps work internally, including hashing algorithms, bucket storage, collision handling, load factors, and dynamic resizing.

## Features

### HashMap

- **hash(key)** – Generates a hash code from a string key using a polynomial hashing algorithm.
- **set(key, value)** – Adds a key-value pair or updates an existing key.
- **get(key)** – Returns the value associated with a key.
- **has(key)** – Checks whether a key exists.
- **remove(key)** – Removes an entry and returns `true` or `false`.
- **length()** – Returns the total number of stored entries.
- **clear()** – Removes all entries while preserving the current capacity.
- **keys()** – Returns an array of all stored keys.
- **values()** – Returns an array of all stored values.
- **entries()** – Returns an array of key-value pairs.

### HashSet (Extra Credit)

- **add(key)** – Adds a unique key to the set.
- **set(key)** – An alias for `add(key)`.
- **has(key)** – Checks whether a key exists.
- **remove(key)** – Removes a key and returns `true` or `false`.
- **length()** – Returns the number of stored keys.
- **clear()** – Removes all keys.
- **keys()** – Returns an array of all stored keys.

Both implementations support collision handling and automatic resizing.

## Project Structure

```text
hashmap/
│
├── src/
│   ├── hashMap.js
│   └── hashSet.js
│
├── main.js
└── README.md
```

## How It Works

### 1. Hashing Algorithm

The `hash()` method converts a string key into a numeric hash code using a prime number (`31`).

The modulo operator (`%`) is applied during every iteration to keep the resulting index within the current bucket capacity.

### 2. Buckets and Collision Handling

The HashMap uses an array of buckets to store entries.

Each bucket contains an array of key-value pairs. When different keys generate the same bucket index, both entries are stored in that bucket.

This technique is called **Separate Chaining**.

### 3. Load Factor and Dynamic Resizing

The HashMap starts with the following configuration:

| Property | Value |
|---|---:|
| Initial Capacity | 16 |
| Load Factor | 0.75 |
| Resize Threshold | More than 75% |

When the number of stored entries exceeds the load factor, the capacity doubles.

Existing entries are then rehashed and redistributed into the new bucket array to ensure their indexes are correct.

### 4. HashSet

The HashSet follows a similar structure to the HashMap but stores only unique keys without associated values.

It also supports collision handling and automatic resizing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Noorullah814/the-odin-project.git
```

Navigate to the `hashmap` project directory inside your cloned repository.

### 2. Install / Configure ES Modules

The project uses JavaScript ES modules. Ensure your `package.json` contains:

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

The `main.js` file contains test cases for both implementations.

### HashMap Tests

- Empty HashMap edge cases.
- Inserting the 12 sample key-value pairs from The Odin Project.
- Checking the load factor at 0.75.
- Updating existing keys without increasing the length or capacity.
- Triggering dynamic resizing by adding the `"moon"` key.
- Verifying entries after resizing.
- Testing `get()`, `has()`, `remove()`, `length()`, `keys()`, `values()`, and `entries()`.
- Testing bucket bounds and `clear()`.

### HashSet Tests

- Adding unique keys.
- Ignoring duplicate keys.
- Checking the length and capacity.
- Triggering dynamic resizing.
- Testing `has()`, `remove()`, and `keys()`.

## Concepts Practiced

- Hash Maps and Hash Sets
- Hashing Algorithms
- Arrays and Nested Arrays
- Key-Value Pairs
- Collision Resolution
- Separate Chaining
- Load Factor
- Modulo Operator
- Dynamic Resizing
- Rehashing
- JavaScript Classes and Methods
- Iteration and Array Manipulation

## Learning Resource

This project was completed as part of [The Odin Project — HashMap](https://www.theodinproject.com/lessons/javascript-hashmap)

## 👨‍💻 Author

**Noor Ullah**

- GitHub: [Noorullah814](https://github.com/Noorullah814)
- Repository: [The Odin Project](https://github.com/Noorullah814/the-odin-project)

---

*Part of my journey through The Odin Project's Full Stack JavaScript curriculum.*
