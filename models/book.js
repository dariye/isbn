const joi = require("joi");
const schema = joi
  .object({
    id: joi.string().required(),
    url: joi.string().required(),
    title: joi.string().required(),
    isbn_10: joi.string(),
    isbn_13: joi.string(),
    author: joi.string().required(),
    source: joi.string().required(),
    pageCount: joi
      .string()
      .default(''),
    published: joi.string().default(""),
    publisher: joi.string().default(""),
    excerpt: joi.string().default(""),
    genre: joi.string().default(""),
    description: joi.string().default(""),
    language: joi.string().default(""),
    binding: joi.string().default(""),
    smallThumbnail: joi.string().default(""),
    thumbnail: joi.string().default(""),
    maturityRating: joi.string().default(""),
    printType: joi.string().default(""),
    sourceLink: joi.string().default(""),
    country: joi.string().default("")
  })
  .unknown();

module.exports = data => joi.validate(data, schema);
