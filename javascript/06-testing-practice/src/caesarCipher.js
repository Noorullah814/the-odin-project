function caesarCipher(string, shiftFactor) {
  let result = "";

  for (const char of string) {
    const code = char.charCodeAt(0);

    // Uppercase letters (A-Z: 65-90)
    if (code >= 65 && code <= 90) {
      const shifted = (((code - 65 + shiftFactor) % 26) + 26) % 26;
      result += String.fromCharCode(shifted + 65);
    }
    // Lowercase letters (a-z: 97-122)
    else if (code >= 97 && code <= 122) {
      const shifted = (((code - 97 + shiftFactor) % 26) + 26) % 26;
      result += String.fromCharCode(shifted + 97);
    }
    // Non-alphabetic characters (spaces, punctuation, numbers)
    else {
      result += char;
    }
  }

  return result;
}

export default caesarCipher;