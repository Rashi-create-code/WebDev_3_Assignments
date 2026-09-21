// Smart Utility Toolkit - CLI Calculator
const colors = { //ANSI escape Code (tells the terminal to display text in this color, ANSI escape codes are special character sequences used by terminals to control text formatting such as color and style.)
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m"
};

console.log(`${colors.cyan}=== CLI Calculator ===${colors.reset}`);
console.log(`${colors.yellow}Starting calculator...${colors.reset}`); //colors.reset resets terminal formatting back to normal.

const [, , operation, firstValue, secondValue] = process.argv; //,, this is in the starting tells the the process.argv to skip first two values as they will always be node filename
// process.argv values are strings
//Command line se jo arguments diye gaye hain, unko access karo -> process.argv (argv-> argument vector)
const num1 = Number(firstValue);
const num2 = Number(secondValue);

if (!operation || firstValue === undefined || secondValue === undefined) {
  console.log("Usage: node calculator.js <add|subtract|multiply|divide> <num1> <num2>");
  process.exit(1); //Stops the program 
  // extra: process.exit(0) means successfull termination & mainly non zero values mean an error
}

if (Number.isNaN(num1) || Number.isNaN(num2)) {
  console.log(`${colors.red}Error: Please provide valid numbers.${colors.reset}`);
  process.exit(1);
}

let result;

switch (operation.toLowerCase()) {  //switch is used when we want to compare one value against multiple possible cases.
  case "add":
    result = num1 + num2;
    break;

  case "subtract":
  case "sub":
    result = num1 - num2;
    break;

  case "multiply":
  case "mul":
    result = num1 * num2;
    break;

  case "divide":
  case "div":
    if (num2 === 0) {
      console.log("Error: Division by zero is not allowed.");
      process.exit(1);
    }
    result = num1 / num2;
    break;
  case "modulus":
  case "mod":
    result = num1 % num2;
    break;

  case "power":
  case "pow":
    result = num1 ** num2;
    break;

  default:  //Runs when none of the cases match
    console.log(`${colors.red}Error: Invalid operation "${operation}".${colors.reset}`);
    console.log("Allowed operations: add, subtract, multiply, divide, modulus, power");
    process.exit(1);
}

console.log(`Operation: ${operation}`);
console.log(`Numbers: ${num1}, ${num2}`);
console.log(`${colors.green}Result: ${result}${colors.reset}`);
console.log("Calculator completed.");
