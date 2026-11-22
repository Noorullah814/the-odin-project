class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity);
  }

  checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    this.checkBounds(index);

    if (!this.checkBounds[index]) {
      this.buckets[index] = [];
    }

    for (const entry of this.buckets[index]) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
  }
}

export default HashMap;
