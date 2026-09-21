// Random Dice Generator using Node.js built-in crypto module
const crypto = require("crypto");  // It provides cryptographic/random functionality.
const fs = require("fs");
// Imports Node's built-in File System module.
// fs allows us to:
// create files
// read files
// write files
// append files
// delete files

function rollDice() {
  return crypto.randomInt(1, 7);
}

console.log("=== Crypto Dice Generator ===");

const numberOfRolls = Number(process.argv[2]) || 5;

if (!Number.isInteger(numberOfRolls) || numberOfRolls <= 0) {
  console.log("Error: Number of rolls must be a positive integer.");
  process.exit(1);
}

const historyFile = "dice-history.txt";

const timestamp = new Date().toLocaleString(); //toLocaleString here gives us the readable string format

fs.appendFileSync(
  historyFile,
  `\n--- Dice Roll Session: ${timestamp} ---\n`,
  "utf8"
);

for (let i = 1; i <= numberOfRolls; i++) {
  const diceValue = rollDice();

  console.log(`Roll ${i}: Dice Rolled: ${diceValue}`);

  fs.appendFileSync(
    historyFile,
    `Roll ${i}: Dice Rolled: ${diceValue}\n`,
    "utf8"
  );
}

console.log("Dice simulation completed.");
