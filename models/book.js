const joi = require("joi");
const schema = joi
  .object({
    id: joi.string().required(),
    url: joi.string().required(),
    title: joi.string().required(),
    isbn_10: joi.string().required(),
    isbn_13: joi.string().required(),
    author: joi.string().required(),
    publisher: joi.string().required(),
    published: joi.string().required(),
    source: joi.string().required(),
    language: joi.string().default(""),
    binding: joi.string().default(""),
    cover: joi.string().default("")
  })
  .unknown()
  .required();

module.exports = data => joi.validate(data, schema);
