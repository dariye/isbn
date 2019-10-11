const { send } = require("micro");
const retry = require("p-retry");
const Route = require("route-parser");
const sources = require("./sources");
const models = require("./models");
const { db } = require("./lib");
const storage = db();

const find = async isbn => {
  let data = {};
  const titles = storage["titles"];
  const stored = await titles.get(isbn);

  // First look through db
  if (stored && Object.keys(stored).length > 0) {
    data = stored;
    return data;
  }

  for (let source in sources) {
    const raw = await sources[source](isbn);
    console.log("raw", raw);
    const { value, error } = models.book(raw);
    if (error) {
      console.log("error", error, value);
      break;
    }

    if (value) {
      console.log("data", data);
      data = await titles.save(value);
      break;
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
  } catch (e) {
    console.log(e);
    send(res, 500);
  }
};

module.exports = main;
