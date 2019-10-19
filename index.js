const { router, get } = require("microrouter");
const handlers = require("./handlers");
module.exports = router(
  get("/find/:isbn", handlers.rest),
  get("/graphql", handlers.graphql),
  get("/", handlers.site)
);
