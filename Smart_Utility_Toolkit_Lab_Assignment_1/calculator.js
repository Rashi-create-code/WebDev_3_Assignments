// Smart Utility Toolkit - CLI Calculator
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m"
};

console.log(`${colors.cyan}=== CLI Calculator ===${colors.reset}`);
console.log(`${colors.yellow}Starting calculator...${colors.reset}`);

const [, , operation, firstValue, secondValue] = process.argv;

const num1 = Number(firstValue);
const num2 = Number(secondValue);

if (!operation || firstValue === undefined || secondValue === undefined) {
  console.log("Usage: node calculator.js <add|subtract|multiply|divide> <num1> <num2>");
  process.exit(1);
}

if (Number.isNaN(num1) || Number.isNaN(num2)) {
  console.log(`${colors.red}Error: Please provide valid numbers.${colors.reset}`);
  process.exit(1);
}

let result;

switch (operation.toLowerCase()) {
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
    
  default:
    console.log(`${colors.red}Error: Invalid operation "${operation}".${colors.reset}`);
    console.log("Allowed operations: add, subtract, multiply, divide.");
    process.exit(1);
}

console.log(`Operation: ${operation}`);
console.log(`Numbers: ${num1}, ${num2}`);
console.log(`${colors.green}Result: ${result}${colors.reset}`);
console.log("Calculator completed.");
