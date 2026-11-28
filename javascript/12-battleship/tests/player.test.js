import Player from "../src/player.js";
import Gameboard from "../src/gameboard.js";
import Ship from "../src/ship.js";

describe("Player", () => {
  test("creates a real player with its own Gameboard", () => {
    const player = new Player("real");
    expect(player.type).toBe("real");
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("creates a computer player with its own Gameboard", () => {
    const cpu = new Player("computer");
    expect(cpu.type).toBe("computer");
    expect(cpu.gameboard).toBeInstanceOf(Gameboard);
  });

  test("throws an error for invalid player type", () => {
    expect(() => new Player("alien")).toThrow();
  });

  test("makeRandomAttack fires 100 unique legal shots without ever repeating a coordinate", () => {
    const cpu = new Player("computer");
    const enemyBoard = new Gameboard();

    for (let i = 0; i < 100; i++) {
      const { coord, result } = cpu.makeRandomAttack(enemyBoard);
      expect(coord[0]).toBeGreaterThanOrEqual(0);
      expect(coord[0]).toBeLessThan(10);
      expect(coord[1]).toBeGreaterThanOrEqual(0);
      expect(coord[1]).toBeLessThan(10);
      expect(result).toBe("miss");
    }

    expect(enemyBoard.attackedCoords.size).toBe(100);
  });

  test("smart computer targeting follows up on adjacent squares after a hit", () => {
    const cpu = new Player("computer");
    const enemyBoard = new Gameboard();
    const ship = new Ship(3);
    enemyBoard.placeShip(ship, [4, 4], "horizontal"); // [4,4], [5,4], [6,4]

    // Seed an initial hit manually and register adjacent targets
    cpu.registerHit([4, 4], enemyBoard);

    const followUp = cpu.makeRandomAttack(enemyBoard);
    const orthogonalNeighbors = [
      [5, 4],
      [3, 4],
      [4, 5],
      [4, 3],
    ];

    expect(orthogonalNeighbors).toContainEqual(followUp.coord);
  });
});