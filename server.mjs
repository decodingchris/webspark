import { createServer } from "node:http";
import { URL } from "node:url";
import fs from "node:fs";

const hostname = "127.0.0.1";
const port = 8080;

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

const serveFile = (filepath, contentType, res) => {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      return showStatus(500, res);
    }
    res.writeHead(200, { "Content-Type": contentType });
    return res.end(data);
  });
};

const server = createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  if (myURL.pathname === "/" && req.method === "GET") {
    serveFile("./index.html", "text/html", res);
  } else {
    return showStatus(404, res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
