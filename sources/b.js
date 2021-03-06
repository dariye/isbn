const fetch = require("node-fetch");
const config = require("../config");
const {
  google: { api_key, api }
} = config;

const encodeUri = require("../utils/encode-uri");

const titleURI = isbn => `${api}/volumes?q=isbn:${isbn}&key=${api_key}`;

module.exports = async isbn => {
  const source = "googlebooks";
  let data = {};
  try {
    const response = await fetch(titleURI(isbn));
    const json = await response.json();
    const { items } = json;

    if (!items || !items.length) {
      return {};
    }
    data = { id: isbn, source };

    const item = items[0];

    const {
      selfLink,
      searchInfo: { textSnippet = "" } = {},
      saleInfo: { country = "" } = {},
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
        imageLinks: {
          thumbnail = `https://via.placeholder.com/256x336.png?text=${encodeUri(
            item.volumeInfo.title
          )}`,
          smallThumbnail = `https://via.placeholder.com/128x168.png?text=${encodeUri(
            item.volumeInfo.title
          )}`
        } = {},
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

    const genre = categories ? categories.join(", ") : "";
    const author = authors ? authors.join(", ") : "";

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
      genre,
      author,
      sourceLink: selfLink,
      published: publishedDate,
      url: canonicalVolumeLink,

      excerpt: textSnippet
    };

    return { ...data };
  } catch (err) {
    console.log(err);
    return data;
  }
};
