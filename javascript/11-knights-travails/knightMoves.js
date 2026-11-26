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
  return KNIGHT_OFFSETS
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(isValidSquare);
}

export { isValidSquare, getValidMoves };