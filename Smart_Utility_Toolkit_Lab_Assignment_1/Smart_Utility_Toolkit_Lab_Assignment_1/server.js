// Basic HTTP server using Node.js built-in http module
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`[SERVER] Request received: ${req.method} ${req.url}`);

  res.setHeader("Content-Type", "text/plain");

  switch (req.url) {
    case "/":
      res.statusCode = 200;
      res.end("Welcome to the Smart Utility Toolkit!");
      console.log("[SERVER] Sent welcome response.");
      break;

    case "/about":
      res.statusCode = 200;
      res.end("About: Smart Utility Toolkit built with Node.js core modules.");
      console.log("[SERVER] Sent about response.");
      break;

    case "/contact":
      res.statusCode = 200;
      res.end("Contact: Please contact the Smart Utility Toolkit team.");
      console.log("[SERVER] Sent contact response.");
      break;

    default:
      res.statusCode = 404;
      res.end("404 - Route Not Found");
      console.log("[SERVER] Sent 404 response.");
  }
});

server.listen(PORT, () => {
  console.log(`=== HTTP Server ===`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Available routes: /, /about, /contact");
  console.log("Press Ctrl+C to stop the server.");
});
