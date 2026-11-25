import Node from "./node.js";

class Tree {
  constructor(array = []) {
    this.root = this.#buildTree(array);
  }

  #buildTree(array) {
    const sortedUnique = [...new Set(array)].sort((a, b) => a - b);
    return this.#buildRecursive(sortedUnique, 0, sortedUnique.length - 1);
  }

  #buildRecursive(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.#buildRecursive(arr, start, mid - 1);
    node.right = this.#buildRecursive(arr, mid + 1, end);

    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return true;
      }
      current = value < current.data ? current.left : current.right;
    }

    return false;
  }

  insert(value) {
    this.root = this.#insertRecursive(this.root, value);
  }

  #insertRecursive(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value === node.data) {
      return node;
    }

    if (value < node.data) {
      node.left = this.#insertRecursive(node.left, value);
    } else {
      node.right = this.#insertRecursive(node.right, value);
    }

    return node;
  }

  deleteItem(value) {
    this.root = this.#deleteRecursive(this.root, value);
  }

  #deleteRecursive(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.#deleteRecursive(node.left, value);
      return node;
    }

    if (value > node.data) {
      node.right = this.#deleteRecursive(node.right, value);
      return node;
    }

    // Target node found (value === node.data):
    // Case 1 & Case 2: 0 or 1 child
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }

    // Case 3: 2 children — find smallest value in right subtree (inorder successor)
    let successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }

    node.data = successor.data;
    node.right = this.#deleteRecursive(node.right, successor.data);
    return node;
  }
}

export default Tree;
