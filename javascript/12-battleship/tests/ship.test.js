import Ship from "../src/ship.js";

describe("Ship", () => {
  test("initializes with the given length and 0 hits", () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  test("throws an error if length is not a positive integer", () => {
    expect(() => new Ship(0)).toThrow();
    expect(() => new Ship(-2)).toThrow();
    expect(() => new Ship(2.5)).toThrow();
  });

  test("hit() increments the hit count", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("isSunk() returns true once hits equal length", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("hit() does not increment hits past ship length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBe(true);
  });
});