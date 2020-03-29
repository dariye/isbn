const joi = require("joi");
const schema = joi
  .object({
    GOOGLE_API_KEY: joi.string().required(),
    GOOGLE_BOOKS_API: joi.string().required()
  })
  .unknown()
  .required();

const { error, value: vars } = joi.validate(process.env, schema);

if (error) throw new Error(`Config validation error: ${error.message}`);

const config = {
  google: {
    api_key: vars.GOOGLE_API_KEY,
    api: vars.GOOGLE_BOOKS_API
  }
};

module.exports = config;
