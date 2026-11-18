import analyzeArray from "../src/analyzeArray";

test("returns average, min, max, and length", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});

test("handles negative numbers", () => {
  expect(analyzeArray([-2, -4, -1])).toEqual({
    average: -7 / 3,
    min: -4,
    max: -1,
    length: 3,
  });
});

test("handles an array with one number", () => {
  expect(analyzeArray([5])).toEqual({
    average: 5,
    min: 5,
    max: 5,
    length: 1,
  });
});