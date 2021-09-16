const fetch = require("node-fetch");
const encodeUri = require("../utils/encode-uri");

const titleURI = isbn => `https://isbn-gardners.vercel.app/api/${isbn}`;

module.exports = async isbn => {
  const source = "gardners";
  let data = {};
  try {
    const response = await fetch(titleURI(isbn));
    const book = await response.json();

    if (!Object.keys(book).length) {
      return {};
    }

    const {
      title,
      cover,
      author,
      publisher,
      binding = "",
      url,
      language = "",
      published = "",
      country = "",
      pageCount = "",
      description = "",
      tags = "",
      weight = "",
      dimensions = "",
      readership = ""
    } = book;

    data = {
      title,
      author,
      publisher,
      published,
      binding,
      url,
      language,
      country,
      pageCount,
      description,
      genre: tags,
      weight,
      dimensions,
      readership,
      source,
      id: isbn,
      thumbnail:
        cover ||
        `https://via.placeholder.com/256x336.png?text=${encodeUri(title)}`,
      smallThumbnail:
        cover ||
        `https://via.placeholder.com/128x168.png?text=${encodeUri(title)}`
    };

    return { ...data };
  } catch (err) {
    console.log(err);
    return data;
  }
};
