import Node from "./node.js";

class LinkedList {
  constructor(head = null) {
    this.headNode = head;
  }

  //Append
  append(value) {
    const newNode = new Node(value);

    if (this.headNode === null) {
      this.headNode = newNode;
      return;
    }

    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  //prepend
  prepend(value) {
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;
  }

  //size
  size() {
    let count = 0;
    let current = this.headNode;

    while (current !== null) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  //head
  head() {
    if (this.headNode === null) {
      return undefined;
    }
    return this.headNode?.value;
  }

  //tail
  tail() {
    if (this.headNode === null) {
      return undefined;
    }

    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current.value;
  }

  //at(index)
  at(index) {
    if (index < 0) {
      return undefined;
    }

    let current = this.headNode;
    let currentIndex = 0;

    while (current !== null) {
      if (currentIndex === index) {
        return current.value;
      }
      current = current.nextNode;
      currentIndex++;
    }
    return undefined;
  }

  //pop
  pop() {
    if (this.headNode === null) {
      return undefined;
    }

    const removedValue = this.headNode.value;
    this.headNode = this.headNode.nextNode;

    return removedValue;
  }

  //contains
  contains(value) {
    let current = this.headNode;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  //find index
  findIndex(value) {
    let current = this.headNode;
    let currentIndex = 0;

    while (current !== null) {
      if (current.value === value) {
        return currentIndex;
      }
      current = current.nextNode;
      currentIndex++;
    }
    return -1;
  }

  //toString
  toString() {
    if (this.headNode === null) {
      return "";
    }

    let result = "";
    let current = this.headNode;

    while (current !== null) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    return result + "null";
  }

  //insertAt
  insertAt(index, ...values) {
    const listSize = this.size();

    if (index < 0 || index > listSize) {
      throw new RangeError("Index out of bounds");
    }

    if (values.length === 0) {
      return;
    }

    const firstNewNode = new Node(values[0]);
    let lastNewNode = firstNewNode;

    for (let i = 1; i < values.length; i++) {
      lastNewNode.nextNode = new Node(values[i]);
      lastNewNode = lastNewNode.nextNode;
    }

    if (index === 0) {
      lastNewNode.nextNode = this.headNode;
      this.headNode = firstNewNode;
      return;
    }

    let prev = this.headNode;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.nextNode;
    }

    lastNewNode.nextNode = prev.nextNode;
    prev.nextNode = firstNewNode;
  }

  //removeAt(index)
  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      throw new RangeError("Index out of bounds");
    }

    if (index === 0) {
      this.headNode = this.headNode.nextNode;
      return;
    }

    let prev = this.headNode;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.nextNode;
    }

    prev.nextNode = prev.nextNode.nextNode;
  }
}
export default LinkedList;
