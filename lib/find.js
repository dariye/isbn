const sources = require("../sources");
const models = require("../models");
const storage = require("./storage");
const db = storage();

async function retrieveFromStorage(isbn) {
  let data = null;
  const titles = db.titles;
  try {
    const stored = await titles.get(isbn);

    if (stored && stored.id && Object.keys(stored).length > 0) {
      data = stored;
    }
  } catch (err) {
    console.error(err);
  }

  return data;
}

async function findFromSources(isbn) {
  let data = null;
  for (let source in sources) {
    const raw = await sources[source](isbn);
    if (!raw || Object.keys(raw).length === 0) {
      continue;
    }
    try {
      const { value, error } = models.book(raw);

      if (value && Object.keys(value).length > 0 && !error) {
        data = value;
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
}

module.exports = async isbn => {
  let data = {};
  const titles = db.titles;
  const [stored, lookup] = await Promise.all([
    retrieveFromStorage(isbn),
    findFromSources(isbn)
  ]);

  data = stored || lookup;

  console.log({ stored, lookup });

  if (!stored && lookup) {
    titles.save(lookup);
  }

  return data;
};
