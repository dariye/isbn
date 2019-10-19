const fetch = require("node-fetch");
const { dom } = require("../lib");

const ROOT_URL = "https://www.bookfinder.com";

const generateQueryUrl = isbn =>
  `${ROOT_URL}/search/?isbn=${isbn}&new_used=*&destination=dk&currency=DKK&mode=basic&st=sr&ac=qr`;

module.exports = async isbn => {
  let data = {};
  const url = generateQueryUrl(isbn);
  const response = await fetch(url);
  const html = await response.text();
  const page = dom(html);
  const document = page.window.document;

  // const imgSelector = '.image > img'
  // const h1Selector = '.bookinfo > h1'
  // const pSelector = '.bookinfo > p'
  // const paragraphs = Array.from(document.querySelectorAll(pSelector)).map((cell) => {
  //     const content = cell.textContent
  //     return content.substr(content.indexOf(':') + 1).trim()
  //   })

  // if (paragraphs.length) {
  //   data = {
  //     url,
  //     title: document.querySelector(imgSelector).src || '',
  //     isbn_10: paragraphs[1] || '',
  //     isbn_13: paragraphs[0] || '',
  //     author: paragraphs[2] || '',
  //     binding: paragraphs[3] || '',
  //     publisher: paragraphs[4] || '',
  //     published: paragraphs[5] || '',
  //     language: '',
  //     cover: document.querySelector(imgSelector).src || '',
  //   }
  // }

  return data;
};
