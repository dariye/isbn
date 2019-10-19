const fs = require("fs");
const path = require("path");

const normalizedPath = path.join(__dirname, ".");

fs.readdirSync(normalizedPath).forEach(function(file) {
  if (!file.includes("index.js")) {
    const name = file.replace(".js", "");
    exports[name] = require(`${normalizedPath}/${file}`);
  }
});
