const retry = require("p-retry");
const validator = require("validator");
const { find } = require("../../lib");

module.exports = async (req, res) => {
  const isbn = req.query.isbn;

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
        res.status(200).send({
          ...data
        });
      } else {
        res.status(204).send();
      }
    } else {
      res.status(204).send({ message: `Invalid ISBN: ${isbn}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
