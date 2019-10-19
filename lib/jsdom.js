const { JSDOM } = require("jsdom");

module.exports = html =>
  new JSDOM(html, {
    referrer: "https://google.com",
    includeNodeLocations: true
  });
