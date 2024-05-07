// Importing required modules
import { createServer } from "node:http";
import { getFullPath, serveFile } from "./helpers.js";
import { getLaunchData } from "./data.js";
import { URL } from "node:url";

const hostname = "127.0.0.1";
const port = 8080;

// Function to create the server
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
      case "/launch-data":
        res.writeHead(200, { "Content-Type": "application/json" });
        const launchData = getLaunchData();
        return res.end(launchData);
      default:
        serveFile(getFullPath("../frontend/404.html"), "text/html", res);
    }
  }
});

// Function to start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
