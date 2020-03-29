if (process.env.NODE_ENV === "development") {
  require("dotenv-safe").config({ silent: true });
}
const monk = require("./components/monk");
const google = require("./components/google");
module.exports = Object.assign({}, monk, google);
