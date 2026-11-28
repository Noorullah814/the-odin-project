import Gameboard from "./gameboard.js";

class Player {
  constructor(type = "real") {
    if (type !== "real" && type !== "computer") {
      throw new Error("Player type must be 'real' or 'computer'.");
    }
    this.type = type;
    this.gameboard = new Gameboard();
    this.targetQueue = [];
  }

  registerHit([x, y], enemyBoard) {
    const candidates = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (const [nx, ny] of candidates) {
      const inBounds = nx >= 0 && nx < 10 && ny >= 0 && ny < 10;
      const key = `${nx},${ny}`;
      const alreadyQueued = this.targetQueue.some(
        ([qx, qy]) => qx === nx && qy === ny
      );

      if (
        inBounds &&
        !enemyBoard.attackedCoords.has(key) &&
        !alreadyQueued
      ) {
        this.targetQueue.push([nx, ny]);
      }
    }
  }

  makeRandomAttack(enemyBoard) {
    let coord = null;

    // Drain smart-hunt adjacent targets first if available and still unattacked
    while (this.targetQueue.length > 0) {
      const candidate = this.targetQueue.shift();
      const key = `${candidate[0]},${candidate[1]}`;
      if (!enemyBoard.attackedCoords.has(key)) {
        coord = candidate;
        break;
      }
    }

    // Otherwise pick uniformly from all remaining unattacked coordinates
    if (coord === null) {
      const available = [];
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (!enemyBoard.attackedCoords.has(`${x},${y}`)) {
            available.push([x, y]);
          }
        }
      }

      if (available.length === 0) {
        throw new Error("No available coordinates left to attack.");
      }

      const randomIndex = Math.floor(Math.random() * available.length);
      coord = available[randomIndex];
    }

    const result = enemyBoard.receiveAttack(coord);
    if (result === "hit") {
      this.registerHit(coord, enemyBoard);
    }

    return { coord, result };
  }
}

export default Player;