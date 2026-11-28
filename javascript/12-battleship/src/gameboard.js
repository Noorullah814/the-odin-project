import Ship from "./ship.js";

const BOARD_SIZE = 10;
const STANDARD_FLEET_LENGTHS = [5, 4, 3, 3, 2];

class Gameboard {
  constructor() {
    this.grid = new Map(); // "x,y" -> Ship
    this.ships = [];
    this.missedAttacks = [];
    this.attackedCoords = new Set(); // "x,y"
  }

  #toKey([x, y]) {
    return `${x},${y}`;
  }

  #isValidCoord([x, y]) {
    return (
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      x < BOARD_SIZE &&
      y >= 0 &&
      y < BOARD_SIZE
    );
  }

  getShipAt(coord) {
    return this.grid.get(this.#toKey(coord)) ?? null;
  }

  placeShip(ship, [startX, startY], orientation = "horizontal") {
    const coords = [];

    for (let i = 0; i < ship.length; i++) {
      const x = orientation === "horizontal" ? startX + i : startX;
      const y = orientation === "vertical" ? startY + i : startY;
      const coord = [x, y];

      if (!this.#isValidCoord(coord) || this.getShipAt(coord) !== null) {
        return false;
      }
      coords.push(coord);
    }

    for (const coord of coords) {
      this.grid.set(this.#toKey(coord), ship);
    }
    this.ships.push(ship);
    return true;
  }

  receiveAttack(coord) {
    if (!this.#isValidCoord(coord)) {
      throw new Error("Attack coordinates must be within 0..9.");
    }

    const key = this.#toKey(coord);
    if (this.attackedCoords.has(key)) {
      throw new Error("Coordinate has already been attacked.");
    }

    this.attackedCoords.add(key);
    const targetShip = this.getShipAt(coord);

    if (targetShip !== null) {
      targetShip.hit();
      return "hit";
    }

    this.missedAttacks.push(coord);
    return "miss";
  }

  allShipsSunk() {
    return this.ships.length > 0 && this.ships.every((ship) => ship.isSunk());
  }

  reset() {
    this.grid.clear();
    this.ships = [];
    this.missedAttacks = [];
    this.attackedCoords.clear();
  }

  placeFleetRandomly(lengths = STANDARD_FLEET_LENGTHS) {
    this.reset();

    for (const length of lengths) {
      const ship = new Ship(length);
      let placed = false;

      while (!placed) {
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * BOARD_SIZE);
        const y = Math.floor(Math.random() * BOARD_SIZE);
        placed = this.placeShip(ship, [x, y], orientation);
      }
    }
  }
}

export default Gameboard;