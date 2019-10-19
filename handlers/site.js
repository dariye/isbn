const serve = require("serve-handler");

module.exports = async (req, res) =>
  await serve(req, res, {
    public: "./_site",
    etag: true,
    cleanUrls: true,
    trailingSlash: true
    // headers: [
    //   {
    //     source: "**/**/*.js",
    //     headers: [{
    //       key: "Content-Type",
    //       value: "text/javascript"
    //     }]
    //   }
    // ]
  });
