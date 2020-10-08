const Joi = require('joi')
const convert = require('joi-to-json-schema')
const { name, description, options, mandatory } = require('./common')
const { ROLES } = require('./constants')

const email = Joi.string()
  .trim()
  .email({ minDomainAtoms: 2 })
  .required()

const password = Joi.string()
  .trim()
  .min(4)
  .max(20)
  .required()

const roles = Joi.array()
  .min(1)
  .required()
  .items(
    Joi.string()
      .required()
      .valid(...ROLES),
  )

const schema = Joi.object().keys({
  email,
  firstName: name,
  lastName: name,
  password,
  job: description,
  roles,
  ...mandatory,
})

schema.options = options

module.exports = schema
module.exports.docs = {
  description: 'User service to be used for accessing this application',
  definitions: {
    users: convert(schema),
    users_list: {
      type: 'array',
      items: {
        $ref: '#/definitions/users',
      },
    },
  },
}
