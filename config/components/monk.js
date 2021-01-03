const joi = require("joi");
const schema = joi
  .object({
    MONGO_URL: joi.string().required()
  })
  .unknown()
  .required();

const { error, value: vars } = joi.validate(process.env, schema);

if (error) throw new Error(`Config validation error: ${error.message}`);

const config = {
  monk: {
    uri: vars.MONGO_URL
  }
};

module.exports = config;
