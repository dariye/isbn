const fetch = require("node-fetch");

const OL_ROOT_API = "https://openlibrary.org/api";
const OL_BOOKS_API = `${OL_ROOT_API}/books`;
const titleURI = isbn =>
  `${OL_BOOKS_API}?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;

module.exports = async isbn => {
  const source = "openlibrary";
  const response = await fetch(titleURI(isbn));
  const json = await response.json();
  const item = json[`ISBN:${isbn}`];
  let data = {};
  if (!item || !Object.keys(item).length) {
    return {};
  }

  data = { id: isbn, source };

  const {
    publishers,
    identifiers,
    subtitle,
    notes,
    title,
    subjects,
    url,
    number_of_pages,
    publish_date,
    authors,
    cover: { small, medium, large } = {}
  } = item;

  const genre = subjects ? subjects.map(({ name }) => name).join(", ") : "";
  const author = authors ? authors.map(({ name }) => name).join(", ") : "";
  const publisher = publishers
    ? publishers.map(({ name }) => name).join(", ")
    : "";

  data = {
    ...data,

    title: `${title} ${subtitle || ""}`,
    description: notes,
    publisher,
    genre,
    author,
    thumbnail:
      large ||
      medium ||
      `https://via.placeholder.com/256x336.png?text=${encoded(
        item.volumeInfo.title
      )}`,
    smallThumbnail:
      small ||
      `https://via.placeholder.com/256x336.png?text=${encoded(
        item.volumeInfo.title
      )}`,
    pageCount: number_of_pages,
    isbn_10: identifiers.isbn_10[0],
    isbn_13: identifiers.isbn_13[0],
    sourceLink: url,
    published: publish_date,
    url: url,

    excerpt: notes
  };

  return { ...data };
};
