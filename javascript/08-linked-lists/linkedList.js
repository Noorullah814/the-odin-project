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
}

export default LinkedList;
