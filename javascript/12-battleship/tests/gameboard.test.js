import Gameboard from "../src/gameboard.js";
import Ship from "../src/ship.js";

describe("Gameboard", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test("places a ship horizontally at valid coordinates", () => {
    const ship = new Ship(3);
    const placed = board.placeShip(ship, [2, 3], "horizontal");

    expect(placed).toBe(true);
    expect(board.getShipAt([2, 3])).toBe(ship);
    expect(board.getShipAt([3, 3])).toBe(ship);
    expect(board.getShipAt([4, 3])).toBe(ship);
    expect(board.getShipAt([5, 3])).toBeNull();
  });

  test("places a ship vertically at valid coordinates", () => {
    const ship = new Ship(3);
    const placed = board.placeShip(ship, [1, 4], "vertical");

    expect(placed).toBe(true);
    expect(board.getShipAt([1, 4])).toBe(ship);
    expect(board.getShipAt([1, 5])).toBe(ship);
    expect(board.getShipAt([1, 6])).toBe(ship);
  });

  test("rejects placement if any part goes out of the 10x10 board", () => {
    const ship = new Ship(4);

    expect(board.placeShip(ship, [8, 0], "horizontal")).toBe(false);
    expect(board.placeShip(ship, [0, 7], "vertical")).toBe(false);
    expect(board.placeShip(ship, [-1, 0], "horizontal")).toBe(false);
    expect(board.getShipAt([8, 0])).toBeNull();
  });

  test("rejects placement if coordinates overlap an existing ship", () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);

    board.placeShip(ship1, [2, 2], "horizontal"); // occupies [2,2], [3,2], [4,2]
    expect(board.placeShip(ship2, [3, 1], "vertical")).toBe(false); // crosses [3,2]
    expect(board.getShipAt([3, 1])).toBeNull();
  });

  test("receiveAttack records a hit on a ship and increments its hit count", () => {
    const ship = new Ship(2);
    board.placeShip(ship, [0, 0], "horizontal");

    const result = board.receiveAttack([1, 0]);
    expect(result).toBe("hit");
    expect(ship.hits).toBe(1);
    expect(board.missedAttacks).toHaveLength(0);
  });

  test("receiveAttack records missed shots and prevents attacking the same square twice", () => {
    const missResult = board.receiveAttack([5, 5]);
    expect(missResult).toBe("miss");
    expect(board.missedAttacks).toEqual([[5, 5]]);

    expect(() => board.receiveAttack([5, 5])).toThrow();
  });

  test("allShipsSunk returns true only when every placed ship is sunk", () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(2);

    board.placeShip(ship1, [0, 0], "horizontal");
    board.placeShip(ship2, [2, 2], "vertical");

    expect(board.allShipsSunk()).toBe(false);

    board.receiveAttack([0, 0]);
    expect(board.allShipsSunk()).toBe(false);

    board.receiveAttack([2, 2]);
    board.receiveAttack([2, 3]);
    expect(board.allShipsSunk()).toBe(true);
  });

  test("placeFleetRandomly places all 5 standard ships without overlap", () => {
    board.placeFleetRandomly();
    expect(board.ships).toHaveLength(5);

    // Total occupied cells across [5, 4, 3, 3, 2] = 17
    let occupiedCount = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (board.getShipAt([x, y]) !== null) {
          occupiedCount++;
        }
      }
    }
    expect(occupiedCount).toBe(17);
  });
});