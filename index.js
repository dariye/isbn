const { send } = require("micro");
const retry = require("p-retry");
const Route = require("route-parser");
const sources = require("./sources");
const models = require("./models");
const { db } = require("./lib");
const storage = db();

const find = async isbn => {
  let data = {};
  const titles = storage.titles;

  try {
    const stored = await titles.get(isbn);

    if (stored && Object.keys(stored).length > 0) {
      data = stored;
      return data;
    }
  } catch (err) {
    console.error(err);
  }

  for (let source in sources) {
    const raw = await sources[source](isbn);

    if (!raw || Object.keys(raw).length === 0) {
      continue;
    }
    try {
      const { value, error } = models.book(raw);
      if (value && Object.keys(value).length > 0 && !error) {
        data = await titles.save(value);
        break;
      } else {
        continue;
      }
    } catch (err) {
      console.error(err);
      continue;
    }
  }
  return data;
};

const main = async (req, res) => {
  const { url } = req;
  const route = new Route("/find/:isbn");
  const { isbn } = route.match(url);
  try {
    if (isbn) {
      const data = await retry(() => find(isbn), {
        onFailedAttempt: error => {
          console.log(
            `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
          );
        },
        retries: 5
      });
      if (Object.keys(data).length > 0) {
        send(res, 200, data);
      } else {
        send(res, 204);
      }
    } else {
      send(res, 404);
    }
  } catch (err) {
    console.error(err);
    send(res, 500);
  }
};

module.exports = main;
