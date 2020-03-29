const fs = require("fs");
const path = require("path");

const normalizedPath = path.join(__dirname, ".");
const blacklist = ["index.js", "dsource.js", "esource.js", "fsource.js"];

fs.readdirSync(normalizedPath).forEach(function(file) {
  if (!blacklist.includes(file)) {
    const name = file.replace(".js", "");
    exports[name] = require(`${normalizedPath}/${file}`);
  }
});
