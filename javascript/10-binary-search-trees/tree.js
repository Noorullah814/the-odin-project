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

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (this.root === null) {
      return;
    }

    const queue = [this.root];
    let head = 0;

    while (head < queue.length) {
      const current = queue[head++];
      callback(current.data);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (node === null) {
      return;
    }

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (node === null) {
      return;
    }

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (node === null) {
      return;
    }

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  height(value) {
    let current = this.root;

    while (current !== null && current.data !== value) {
      current = value < current.data ? current.left : current.right;
    }

    if (current === null) {
      return undefined;
    }

    return this.#getNodeHeight(current);
  }

  #getNodeHeight(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.#getNodeHeight(node.left);
    const rightHeight = this.#getNodeHeight(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value) {
    let current = this.root;
    let edges = 0;

    while (current !== null) {
      if (value === current.data) {
        return edges;
      }
      current = value < current.data ? current.left : current.right;
      edges++;
    }

    return undefined;
  }

  isBalanced() {
    return this.#checkBalance(this.root).balanced;
  }

  #checkBalance(node) {
    if (node === null) {
      return { balanced: true, height: -1 };
    }

    const left = this.#checkBalance(node.left);
    if (!left.balanced) {
      return { balanced: false, height: -1 };
    }

    const right = this.#checkBalance(node.right);
    if (!right.balanced) {
      return { balanced: false, height: -1 };
    }

    const balanced = Math.abs(left.height - right.height) <= 1;
    const height = 1 + Math.max(left.height, right.height);

    return { balanced, height };
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((value) => values.push(value));
    this.root = this.#buildTree(values);
  }
}

export default Tree;
