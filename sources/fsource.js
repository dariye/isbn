const fetch = require("node-fetch");
const { dom } = require("../lib");

const ROOT_URL = "https://isbndb.com/book";

module.exports = async isbn => {
  const source = "isbndbn";
  let data = {};
  const url = `${ROOT_URL}/${isbn}`;
  const response = await fetch(url);
  const html = await response.text();
  const page = dom(html);
  const document = page.window.document;
  const imgSelector = 'object[type="image/png"]';
  const tdSelector = ".book-table > table tr";
  const cover = document.querySelector(imgSelector).data;
  data = { id: isbn, url, source, cover };
  const fields = {};

  Array.from(document.querySelectorAll(tdSelector)).forEach(cell => {
    const cellField = cell.firstElementChild;
    const cellValue = cell.lastElementChild;
    if (cell && cellField && cellValue) {
      const field = cellField.textContent.trim();
      const value = cellValue.textContent.trim();
      fields[`${field.toLowerCase()}`] = value;
    }
  });

  const { publisher, authors: author, language, binding } = fields;

  const title = fields["full title"];
  const published = fields["publish date"];
  return { ...data, publisher, author, binding, language, title, published };
};
