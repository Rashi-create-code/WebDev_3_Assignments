// Custom reusable module: isEven
function isEven(number) {
  if (typeof number !== "number" || Number.isNaN(number)) {
    return false;
  }

  return number % 2 === 0;
}

module.exports = isEven;
