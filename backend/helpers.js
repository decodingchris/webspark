import { readFile } from "node:fs";
import { fileURLToPath } from "node:url";
import { error500 } from "./errors.js";

// Function to serve files
export const serveFile = (filepath, contentType, res) => {
  // Read the file and handle errors
  readFile(filepath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return error500(res);
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
