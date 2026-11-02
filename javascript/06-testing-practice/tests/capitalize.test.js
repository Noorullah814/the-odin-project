import capitalize from "../src/capitalize";

test("capitalizes the first character of a string", () => {
  expect(capitalize("hello")).toBe("Hello");
});

test("capitalizes a string that starts with a lowercase letter", () => {
  expect(capitalize("javascript")).toBe("Javascript");
});

test("returns an empty string when given an empty string", () => {
  expect(capitalize("")).toBe("");
});