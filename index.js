const { router, get } = require("microrouter");
const cors = require("micro-cors")();
const handlers = require("./handlers");

const withCors = reqHandler => cors(reqHandler);

module.exports = router(
  get("/find/:isbn", withCors(handlers.rest)),
  get("/graphql", withCors(handlers.graphql)),
  get("*", withCors(handlers.site))
);
