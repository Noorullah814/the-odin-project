function analyzeArray(array) {
  if (array.length === 0) {
    return {
      average: null,
      min: null,
      max: null,
      length: 0,
    };
  }

  const sum = array.reduce((total, current) => total + current, 0);
  const length = array.length;

  return {
    average: sum / length,
    min: Math.min(...array),
    max: Math.max(...array),
    length,
  };
}

export default analyzeArray;