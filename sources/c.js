const fetch = require("node-fetch");
const { dom } = require("../lib");

const ROOT_URL = "https://isbnsearch.org/isbn";

module.exports = async isbn => {
  const source = "isbnsearch";
  let data = {};
  const url = `${ROOT_URL}/${isbn}`;
  const response = await fetch(url);
  const html = await response.text();
  const page = dom(html);
  const document = page.window.document;

  const imgSelector = ".image > img";
  const h1Selector = ".bookinfo > h1";
  const pSelector = ".bookinfo > p";
  let title = "";
  let thumbnail = "";

  if (document.querySelector(h1Selector)) {
    title = document.querySelector(h1Selector).textContent.trim();
  }

  if (document.querySelector(imgSelector)) {
    thumbnail = document.querySelector(imgSelector).src || "";
  }

  data = { id: isbn, title, url, source, thumbnail, smallThumbnail: thumbnail };

  Array.from(document.querySelectorAll(pSelector)).forEach(cell => {
    const content = cell.textContent;
    if (content) {
      const field = content.substr(0, content.indexOf(":")).trim();
      const value = content.substr(content.indexOf(":") + 1).trim();
      data[`${field.toLowerCase().replace("-", "_")}`] = value;
    }
  });

  return data;
};
