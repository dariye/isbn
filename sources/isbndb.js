const fetch = require("node-fetch");
const { getDOM } = require("../lib");

const ROOT_URL = "https://isbndb.com/book";

module.exports = async isbn => {
  let data = {};
  const url = `${ROOT_URL}/${isbn}`;
  const response = await fetch(url);
  const html = await response.text();
  const dom = getDOM(html);
  const document = dom.window.document;
  const imgSelector = 'object[type="image/png"]';
  const tdSelector = ".book-table > table tr";
  const cells = Array.from(document.querySelectorAll(tdSelector)).map(cell =>
    cell.lastElementChild.textContent.trim()
  );

  if (cells.length) {
    data = {
      url,
      id: isbn,
      source: "isbndb",
      title: cells[0] || "",
      isbn_10: cells[1] || "",
      isbn_13: cells[2] || "",
      publisher: cells[4] || "",
      author: cells[5] || "",
      published: cells[6] || "",
      binding: cells[7] || "",
      language: cells[8] || "",
      cover: document.querySelector(imgSelector).data
    };
  }

  return data;
};
