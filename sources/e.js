const fetch = require("node-fetch");
const dom = require("../lib/dom");

const ROOT_URL = "http://www.bookfinder4u.com";

const generateQueryUrl = isbn =>
  `${ROOT_URL}//IsbnSearch.aspx?isbn=${isbn}&mode=direct`;

module.exports = async isbn => {
  let data = {};
  const url = generateQueryUrl(isbn);
  console.log(url);
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
