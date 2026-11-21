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
}

export default LinkedList;
