const sources = require("../sources");
const models = require("../models");
const storage = require("./storage");
const db = storage();

async function retrieveTitleFromStorage(isbn) {
  const titles = db.titles;
  try {
    const stored = await titles.get(isbn);

    if (stored && stored.id && Object.keys(stored).length > 0) {
      return stored;
    }
  } catch (err) {
    console.error(err);
  }

  return null;
}

async function findTitleFromSources(isbn) {
  for (let source in sources) {
    const raw = await sources[source](isbn);
    if (!raw || Object.keys(raw).length === 0) {
      continue;
    }
    try {
      const { value, error } = models.book(raw);

      if (value && Object.keys(value).length > 0 && !error) {
        return value;
        break;
      } else {
        continue;
      }
    } catch (err) {
      console.error(err);
      continue;
    }
  }

  return null;
}

module.exports = async isbn => {
  let data = {};
  const titles = db.titles;
  const [storedTitle, newTitle] = await Promise.all([
    retrieveTitleFromStorage(isbn),
    findTitleFromSources(isbn)
  ]);

  data = storedTitle || newTitle;

  if (!storedTitle && newTitle) {
    titles.save(newTitle);
  }

  return data;
};
