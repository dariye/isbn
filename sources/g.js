const fetch = require("node-fetch");
const encodeUri = require("../utils/encode-uri");
const xml2js = require("xml2js");
const key = "YbPxjTySq40M64G0FgYAWg";

const GOOD_READS_API = `https://www.goodreads.com/book/isbn`;
const titleURI = isbn => `${GOOD_READS_API}/${isbn}?key=${key}`;

module.exports = async isbn => {
  const source = "goodreads";
  const response = await fetch(titleURI(isbn));
  const text = await response.text();

  const {
    GoodreadsResponse: { book }
  } = await xml2js.parseStringPromise(text, {
    trim: true,
    normalize: true,
    explicitArray: false
  });

  console.log(book.title, { book });
  //   const item = json[`ISBN:${isbn}`];
  let data = {};
  //   if (!item || !Object.keys(item).length) {
  //     return {};
  //   }

  //   data = { id: isbn, source };

  //   const {
  //     publishers,
  //     identifiers = {},
  //     subtitle,
  //     notes,
  //     title,
  //     subjects,
  //     url,
  //     number_of_pages,
  //     publish_date,
  //     authors,
  //     cover: { small, medium, large } = {}
  //   } = item;

  //   const genre = subjects ? subjects.map(({ name }) => name).join(', ') : '';
  //   const author = authors ? authors.map(({ name }) => name).join(', ') : '';
  //   const publisher = publishers
  //     ? publishers.map(({ name }) => name).join(', ')
  //     : '';

  //   data = {
  //     ...data,

  //     title: `${title} ${subtitle || ''}`,
  //     description: notes,
  //     publisher,
  //     genre,
  //     author,
  //     thumbnail:
  //       large ||
  //       medium ||
  //       `https://via.placeholder.com/256x336.png?text=${encodeUri(
  //         item.volumeInfo.title
  //       )}`,
  //     smallThumbnail:
  //       small ||
  //       `https://via.placeholder.com/256x336.png?text=${encodeUri(
  //         item.volumeInfo.title
  //       )}`,
  //     pageCount: number_of_pages,
  //     isbn_10: identifiers.isbn_10 ? identifiers.isbn_10[0] : '',
  //     isbn_13: identifiers.isbn_13 ? identifiers.isbn_13[0] : '',
  //     sourceLink: url,
  //     published: publish_date,
  //     url: url,

  //     excerpt: notes
  //   };

  return { ...data };
};
