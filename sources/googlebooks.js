const fetch = require("node-fetch");
const config = require("../config");
const {
  google: { api_key, api }
} = config;

const titleURI = isbn => `${api}/volumes?q=isbn:${isbn}&key=${api_key}`;

module.exports = async isbn => {
  const source = "googlebooks";
  const response = await fetch(titleURI(isbn));
  const json = await response.json();
  const { items } = json;
  let data = {};

  if (!items || !items.length) {
    return {};
  }
  data = { id: isbn, source };

  const item = items[0];

  const {
    selfLink,
    searchInfo: { textSnippet },
    saleInfo: { country } = {},
    volumeInfo: {
      publishedDate,
      publisher,
      title,
      authors,
      description,
      industryIdentifiers,
      pageCount,
      printType,
      categories,
      maturityRating,
      imageLinks: { thumbnail, smallThumbnail } = {},
      language,
      canonicalVolumeLink
    } = {}
  } = item;

  const identifiers = Object.assign(
    {},
    ...industryIdentifiers.map(({ type, identifier }) => ({
      [type.toLowerCase()]: identifier
    }))
  );

  data = {
    ...data,

    ...identifiers,
    title,
    country,
    description,
    thumbnail,
    smallThumbnail,
    language,
    maturityRating,
    printType,
    pageCount,
    publisher,
    sourceLink: selfLink,
    published: publishedDate,
    url: canonicalVolumeLink,

    excerpt: textSnippet,
    genre: categories.join(", "),
    author: authors.join(", ")
  };

  return { ...data };
};
