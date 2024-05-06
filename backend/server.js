// Importing required modules
import { createServer } from "node:http";
import { readFile } from "node:fs";
import { URL, fileURLToPath } from "node:url";

const hostname = "127.0.0.1";
const port = 8080;

// Function to handle different status codes
const showStatus = (statusCode, res) => {
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
const serveFile = (filepath, contentType, res) => {
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
const getFullPath = (filepath) => {
  return fileURLToPath(new URL(filepath, import.meta.url));
};

// Create the server
const server = createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  // Serve different files or json based on the URL pathname
  if (req.method === "GET") {
    switch (myURL.pathname) {
      case "/":
        serveFile(getFullPath("../frontend/index.html"), "text/html", res);
        break;
      case "/style.css":
        serveFile(getFullPath("../frontend/style.css"), "text/css", res);
        break;
      case "/script.js":
        serveFile(getFullPath("../frontend/script.js"), "text/javascript", res);
        break;
      case "/data":
        res.writeHead(200, { "Content-Type": "application/json" });
        const today = new Date();
        // add 24 hours in milliseconds to get tomorrow's date and time
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        const launchDate = tomorrow.toLocaleString([], {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const launchData = {
          date: launchDate,
          word: "on",
        };
        const launchJson = JSON.stringify(launchData);
        return res.end(launchJson);
      default:
        return showStatus(404, res);
    }
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
