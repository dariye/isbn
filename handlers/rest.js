const { send } = require("micro");
const retry = require("p-retry");
const validator = require("validator");
const { find } = require("../lib");

module.exports = async (req, res) => {
  const { isbn } = req.params;

  try {
    if (validator.isISBN(isbn)) {
      const data = await retry(() => find(isbn), {
        onFailedAttempt: error => {
          console.log(
            `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
          );
        },
        retries: 5
      });
      if (Object.keys(data).length > 0) {
        send(res, 200, {
          id: data.id,
          url: data.url,
          title: data.title,
          isbn10: data.isbn_10,
          isbn13: data.isbn_13,
          author: data.author,
          publisher: data.publisher,
          published: data.published,
          source: data.source,
          language: data.language,
          binding: data.binding,
          cover: data.cover
        });
      } else {
        send(res, 204);
      }
    } else {
      send(res, 204, { message: `Invalid ISBN: ${isbn}` });
    }
  } catch (err) {
    console.error(err);
    send(res, 500);
  }
};
