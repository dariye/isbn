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
      .allow("")
      .default(""),
    published: joi
      .string()
      .allow("")
      .default(""),
    publisher: joi
      .string()
      .allow("")
      .default(""),
    excerpt: joi
      .string()
      .allow("")
      .default(""),
    genre: joi
      .string()
      .allow("")
      .default(""),
    description: joi
      .string()
      .allow("")
      .default(""),
    language: joi
      .string()
      .allow("")
      .default(""),
    binding: joi
      .string()
      .allow("")
      .default(""),
    smallThumbnail: joi
      .string()
      .allow("")
      .default(""),
    thumbnail: joi
      .string()
      .allow("")
      .default(""),
    maturityRating: joi
      .string()
      .allow("")
      .default(""),
    printType: joi
      .string()
      .allow("")
      .default(""),
    sourceLink: joi
      .string()
      .allow("")
      .default(""),
    country: joi
      .string()
      .allow("")
      .default("")
  })
  .unknown();

module.exports = data => joi.validate(data, schema);
