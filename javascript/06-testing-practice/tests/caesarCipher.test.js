import caesarCipher from "../src/caesarCipher";

test("shifts lowercase letters", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("preserves uppercase and lowercase letters", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});

test("preserves spaces and punctuation", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});

test("wraps around the alphabet", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("handles a shift of zero", () => {
  expect(caesarCipher("Hello", 0)).toBe("Hello");
});