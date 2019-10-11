if (process.env.NODE_ENV === "development") {
  require("dotenv-safe").config({ silent: true });
}
const monk = require("./components/monk");
module.exports = Object.assign({}, monk);
