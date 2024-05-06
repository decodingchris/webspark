import { readFile } from "node:fs";
import { fileURLToPath } from "node:url";

// Function to handle different status codes
export const showStatus = (statusCode, res) => {
  switch (statusCode) {
    case 404:
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
      break;
    case 500:
      res.writeHead(500, { "Content-Type": "text/html" });
      return res.end("Server Error");
      break;
    default:
      res.writeHead(500, { "Content-Type": "text/html" });
      return res.end("Server Error");
  }
};

// Function to serve files
export const serveFile = (filepath, contentType, res) => {
  // Read the file and handle errors
  readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return showStatus(500, res);
    }
    // Send the file content as response
    res.writeHead(200, { "Content-Type": contentType });
    return res.end(data);
  });
};

// Function to get full path of a file
export const getFullPath = (filepath) => {
  return fileURLToPath(new URL(filepath, import.meta.url));
};
