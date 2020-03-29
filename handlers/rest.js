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
          ...data
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
