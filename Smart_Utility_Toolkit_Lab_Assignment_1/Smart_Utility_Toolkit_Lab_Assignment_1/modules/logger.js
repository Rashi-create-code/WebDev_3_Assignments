// Reusable logger module with timestamp

function logger(message) {
  const timestamp = new Date().toLocaleString(); //we don't want to change time stamp after assigning it so we used const here

  console.log(`[${timestamp}] ${message}`);
}

module.exports = logger;