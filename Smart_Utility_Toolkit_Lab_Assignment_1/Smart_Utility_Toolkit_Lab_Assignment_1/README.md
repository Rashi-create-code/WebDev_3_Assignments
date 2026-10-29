# Lab Assignment 1 – Smart Utility Toolkit

## Expected Project Structure

```text
smart-utility-toolkit/
│
├── calculator.js
├── app.js
├── server.js
├── fileManager.js
├── dice.js
├── test.txt
│
├── modules/
│   ├── isEven.js
│   └── logger.js
│
├── package.json
└── README.md
```

This structure follows the assignment's expected layout. The required Node.js core modules are used without Express or external npm packages.

## Run the Programs

### Calculator
```bash
node calculator.js add 10 5
node calculator.js subtract 10 5
node calculator.js multiply 10 5
node calculator.js divide 10 5
node calculator.js modulus 10 3
node calculator.js power 2 5
```

### Custom Modules
```bash
node app.js
```

`app.js` imports both `isEven.js` and `logger.js` using `require()`. Both modules export reusable functionality with `module.exports`.

### HTTP Server
```bash
node server.js
```

Open:
- http://localhost:3000/
- http://localhost:3000/about
- http://localhost:3000/contact
- http://localhost:3000/invalid
- http://localhost:3000/random

### File Manager
```bash
node fileManager.js
```

It demonstrates create, read, update, and delete operations using `writeFile()`, `readFile()`, `appendFile()`, and `unlink()`.

### Dice
```bash
node dice.js
node dice.js 10
```

The dice generator uses Node.js `crypto.randomInt()` to generate values from 1 to 6.
