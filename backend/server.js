// Importing required modules
import { createServer } from "node:http";
import { URL } from "node:url";
import { showStatus, serveFile, getFullPath } from "./helper.js";
import { getLaunchData } from "./data.js";

const hostname = "127.0.0.1";
const port = 8080;

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
      case "/launch-data":
        res.writeHead(200, { "Content-Type": "application/json" });
        const launchData = getLaunchData();
        return res.end(launchData);
      default:
        return showStatus(404, res);
    }
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
