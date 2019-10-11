const joi = require("joi");
const schema = joi
  .object({
    MONGODB_URI: joi.string().required()
  })
  .unknown()
  .required();

const { error, value: vars } = joi.validate(process.env, schema);

if (error) throw new Error(`Config validation error: ${error.message}`);

const config = {
  monk: {
    uri: vars.MONGODB_URI
  }
};

module.exports = config;
