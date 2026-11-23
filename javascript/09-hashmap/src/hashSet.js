class HashSet {
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

  add(key) {
    const index = this.hash(key);
    this.checkBounds(index);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    if (this.buckets[index].includes(key)) {
      return;
    }

    this.buckets[index].push(key);

    if (this.length() / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  set(key) {
    this.add(key);
  }

  has(key) {
    const index = this.hash(key);
    this.checkBounds(index);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }

    return bucket.includes(key);
  }

  remove(key) {
    const index = this.hash(key);
    this.checkBounds(index);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }

    const keyIndex = bucket.indexOf(key);
    if (keyIndex !== -1) {
      bucket.splice(keyIndex, 1);
      return true;
    }

    return false;
  }

  length() {
    let count = 0;

    for (const bucket of this.buckets) {
      if (bucket) {
        count += bucket.length;
      }
    }

    return count;
  }

  clear() {
    this.buckets = new Array(this.capacity);
  }

  keys() {
    const allKeys = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (const key of bucket) {
          allKeys.push(key);
        }
      }
    }

    return allKeys;
  }

  resize() {
    const oldKeys = this.keys();
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);

    for (const key of oldKeys) {
      this.add(key);
    }
  }
}

export default HashSet;