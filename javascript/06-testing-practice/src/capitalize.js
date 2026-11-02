function capitalize(string) {
  if (!string) return string; // Guard clause for empty strings
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default capitalize;