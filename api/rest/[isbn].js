// const retry = require('p-retry');
const validator = require("validator");
const find = require("../../lib/find");
const regex = /\/(find\/(.+))/;

module.exports = async (req, res) => {
  const isbn = req.url.match(regex)[2];
  try {
    if (validator.isISBN(isbn)) {
      const data = await find(isbn);

      if (Object.keys(data).length > 0) {
        res.status(200).json({
          ...data
        });
      } else {
        res.status(204).send();
      }
    } else {
      console.log("error");
      res.status(204).json({ message: `Invalid ISBN: ${isbn}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
