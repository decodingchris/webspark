// Function to create an error 500 html page
export const error500 = (res) => {
  res.writeHead(500, { "Content-Type": "text/html; charset=UTF-8" });
  res.write("<!DOCTYPE html>");
  res.write('<html lang="en">');
  res.write("<head>");
  res.write('<meta charset="UTF-8" />');
  res.write(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
  );
  res.write(
    '<meta name="description" content="Test Your Web App Ideas Quickly" />'
  );
  res.write("<title>Server Error - WebSpark</title>");
  res.write(
    '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️</text></svg>" />'
  );
  res.write("</head>");
  res.write("<body style='font-family: Arial, Helvetica, sans-serif'>");
  res.write("<h1>Whoops! Server Error!</h1>");
  res.write("<p>Oh dear! 🙀</p>");
  res.write(
    "<p>It seems like our server has tripped over a digital banana peel. 🍌</p>"
  );
  res.write(
    "<p>Our best people are on it and we're working hard to fix this. 👨‍🔧</p>"
  );
  res.write("<p>We'll be back before you know it! 👋</p>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
};
