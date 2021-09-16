const sources = require("../sources");
const models = require("../models");
const storage = require("./storage");
const db = storage();

module.exports = async isbn => {
  let data = {};
  const titles = db.titles;

  try {
    const stored = await titles.get(isbn);

    if (stored && stored.id && Object.keys(stored).length > 0) {
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
