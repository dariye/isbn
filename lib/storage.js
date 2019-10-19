const monk = require("monk");
const config = require("../config");
const {
  monk: { uri }
} = config;

const getStorage = (db, zone) => {
  const table = db.get(zone);
  return {
    get: async id => await table.findOne({ id }),
    save: async data =>
      await table.findOneAndUpdate(
        { id: data.id },
        { $set: data },
        {
          upsert: true,
          returnNewDocument: true
        }
      ),
    find: async data => await table.find(data),
    all: async () => await table.find({}),
    delete: async id => await table.findOneAndDelete({ id })
  };
};

module.exports = () => {
  const db = monk(uri);
  db.catch(function(err) {
    throw new Error(err);
  });

  let storage = {};
  const tables = ["titles"];

  tables.forEach(table => {
    storage[table] = getStorage(db, table);
  });

  return storage;
};
