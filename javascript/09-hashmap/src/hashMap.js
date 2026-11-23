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

    if (!this.buckets[index]) {
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

  get(key) {
    const index = this.hash(key);
    this.checkBounds(index);
    const bucket = this.buckets[index];

    if (!bucket) {
      return undefined;
    }

    for (const entry of bucket) {
      if (entry[0] === key) {
        return entry[1];
      }
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);
    this.checkBounds(index);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }

    for (const entry of bucket) {
      if (entry[0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    this.checkBounds(index);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
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
        for (const entry of bucket) {
          allKeys.push(entry[0]);
        }
      }
    }

    return allKeys;
  }

  values() {
    const allValues = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (const entry of bucket) {
          allValues.push(entry[1]);
        }
      }
    }

    return allValues;
  }

  entries() {
    const allEntries = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (const entry of bucket) {
          allEntries.push([entry[0], entry[1]]);
        }
      }
    }

    return allEntries;
  }
}

export default HashMap;
