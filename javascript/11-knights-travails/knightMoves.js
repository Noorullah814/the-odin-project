const KNIGHT_OFFSETS = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function isValidSquare([x, y]) {
  return (
    Number.isInteger(x) &&
    Number.isInteger(y) &&
    x >= 0 &&
    x <= 7 &&
    y >= 0 &&
    y <= 7
  );
}

function getValidMoves([x, y]) {
  return KNIGHT_OFFSETS.map(([dx, dy]) => [x + dx, y + dy]).filter(
    isValidSquare,
  );
}

function knightMoves(start, end) {
  if (
    !Array.isArray(start) ||
    !Array.isArray(end) ||
    !isValidSquare(start) ||
    !isValidSquare(end)
  ) {
    throw new Error(
      "Invalid board coordinates. Expected [x, y] with values between 0 and 7.",
    );
  }

  const queue = [[start, [start]]];
  let head = 0;
  const visited = new Set([`${start[0]},${start[1]}`]);

  while (head < queue.length) {
    const [current, path] = queue[head++];

    if (current[0] === end[0] && current[1] === end[1]) {
      return path;
    }

    for (const next of getValidMoves(current)) {
      const key = `${next[0]},${next[1]}`;

      if (!visited.has(key)) {
        visited.add(key);
        queue.push([next, [...path, next]]);
      }
    }
  }
}

export { isValidSquare, getValidMoves, knightMoves };
export default knightMoves;
