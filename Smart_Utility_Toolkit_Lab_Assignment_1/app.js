// Application file demonstrating custom module reusability
const isEven = require("./modules/isEven");
const logger = require("./modules/logger");

logger("Smart Utility Toolkit application started.");

const numbers = [4, 7, 10, 13, 22];

numbers.forEach((number) => {
  console.log(`${number} is ${isEven(number) ? "Even" : "Odd"}`);
});

logger("Custom modules reused successfully.");
