const fetch = require("node-fetch");
const encodeUri = require("../utils/encode-uri");

const titleURI = isbn => `https://isbn-gardners.vercel.app/api/${isbn}`;

module.exports = async isbn => {
  console.group("gardnersLookup");
  const source = "gardners";
  let data = {};
  try {
    console.log({ isbn });
    const response = await fetch(titleURI(isbn));
    const book = await response.json();
    console.log({ book });

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

    console.groupEnd("gardnersLookup");

    return { ...data };
  } catch (err) {
    console.log(err);
    return data;
  }
};
