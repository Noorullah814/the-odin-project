import calculator from "../src/calculator";

test("adds two numbers", () => {
  expect(calculator.add(5, 3)).toBe(8);
});

test("subtracts two numbers", () => {
  expect(calculator.subtract(5, 3)).toBe(2);
});

test("divides two numbers", () => {
  expect(calculator.divide(6, 3)).toBe(2);
});

test("multiplies two numbers", () => {
  expect(calculator.multiply(5, 3)).toBe(15);
});