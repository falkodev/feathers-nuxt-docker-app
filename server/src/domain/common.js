const Joi = require('joi')

module.exports = {
  name: Joi.string()
    .trim()
    .max(30)
    .regex(/\w/)
    .required(),

  description: Joi.string()
    .trim()
    .max(200)
    .allow(null, ''),

  mandatory: {
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
  },

  options: { convert: true, abortEarly: false },
}
