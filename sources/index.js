const fs = require("fs");
const path = require("path");

const normalizedPath = path.join(__dirname, ".");
const omit = [
  "index.js",
  "a.js",
  "b.js",
  "c.js",
  "d.js",
  "e.js",
  "f.js",
  "g.js"
];

fs.readdirSync(normalizedPath).forEach(function(file) {
  if (!omit.includes(file)) {
    const name = file.replace(".js", "");
    exports[name] = require(`${normalizedPath}/${file}`);
  }
});
