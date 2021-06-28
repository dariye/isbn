const fetch = require("node-fetch");
const config = require("../config");
const {
  google: { api_key, api }
} = config;

const encodeUri = require("../utils/encode-uri");

const titleURI = isbn => `https://isbn-gardners.vercel.app/api/${isbn}`;

module.exports = async isbn => {
  const source = "gardners";
  let data = {};
  try {
    const response = await fetch(titleURI(isbn));
    const book = await response.json();
    console.log({ book });

    if (!Object.keys(book).length) {
      return {};
    }

    data = {
      ...book,
      source,
      thumbnail:
        book.cover ||
        `https://via.placeholder.com/256x336.png?text=${encodeUri(book.title)}`,
      smallThumbnail:
        book.cover ||
        `https://via.placeholder.com/128x168.png?text=${encodeUri(book.title)}`
    };

    return { ...data };
  } catch (err) {
    console.log(err);
    return data;
  }
};
