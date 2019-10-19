const serve = require("serve-handler");

module.exports = async (req, res) =>
  await serve(req, res, {
    public: "./_site",
    cleanUrls: true
  });
