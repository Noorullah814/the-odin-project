import reverseString from "../src/reverseString";

test("reverses a simple string", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("reverses a string containing uppercase and lowercase letters", () => {
  expect(reverseString("JavaScript")).toBe("tpircSavaJ");
});

test("returns a single character unchanged", () => {
  expect(reverseString("a")).toBe("a");
});

test("returns an empty string when given an empty string", () => {
  expect(reverseString("")).toBe("");
});