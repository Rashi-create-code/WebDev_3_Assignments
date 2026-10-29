
 // Application file demonstrating execution flow and custom module reusability
const isEven = require("./modules/isEven");
const logger = require("./modules/logger");

console.log("[1] Application started.");
logger("Smart Utility Toolkit application started.");

// Track command-line inputs
console.log("[2] Command-line arguments:", process.argv.slice(2));

// Display the numbers
const numbers = [4, 7, 10, 13, 22];

console.log("[3] Starting number analysis...");

numbers.forEach((number) => {
  console.log(`${number} is ${isEven(number) ? "Even" : "Odd"}`);
});

console.log("[4] Number analysis completed.");

// Demonstrate synchronous and asynchronous execution
console.log("[5] Synchronous operation started.");

console.log("This message executes immediately.");

setTimeout(() => {
  console.log("[7] Asynchronous operation executed.");
}, 0);

console.log("[6] Synchronous operation completed.");

logger("Custom modules reused successfully.");
console.log("[8] Application execution completed.");
