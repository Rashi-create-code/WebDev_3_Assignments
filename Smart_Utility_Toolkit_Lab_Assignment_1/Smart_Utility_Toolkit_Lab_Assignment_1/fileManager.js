// File Manager using Node.js built-in fs module
const fs = require("fs");

const fileName = "test.txt";
const initialContent = "This file was created by the Smart Utility Toolkit.";

console.log("=== File Manager ===");

// CREATE
console.log("[1] Creating file...");
fs.writeFile(fileName, initialContent, "utf8", (error) => {
  if (error) {
    console.log("Create Error:", error.message);
    return;
  }

  console.log("File created successfully.");

  // READ
  console.log("[2] Reading file...");
  fs.readFile(fileName, "utf8", (error, data) => {
    if (error) {
      console.log("Read Error:", error.message);
      return;
    }

    console.log("File content:", data);

    // UPDATE
    console.log("[3] Updating file...");
    const updatedContent = "\nThis line was added during the update operation.";

    fs.appendFile(fileName, updatedContent, "utf8", (error) => {
      if (error) {
        console.log("Update Error:", error.message);
        return;
      }

      console.log("File updated successfully.");

      // READ UPDATED CONTENT
      fs.readFile(fileName, "utf8", (error, updatedData) => {
        if (error) {
          console.log("Updated Read Error:", error.message);
          return;
        }

        console.log("Updated file content:");
        console.log(updatedData);

        // DELETE
        console.log("[4] Deleting file...");
        fs.unlink(fileName, (error) => {
          if (error) {
            if (error.code === "ENOENT") {
              console.log("Delete Error: File does not exist.");
            } else {
              console.log("Delete Error:", error.message);
            }
            return;
          }

          console.log("File deleted successfully.");
          console.log("All file operations completed.");
        });
      });
    });
  });
});
