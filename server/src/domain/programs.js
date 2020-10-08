const BaseJoi = require('joi')
const JoiIbanExtension = require('joi-iban-extension')
const Joi = BaseJoi.extend(JoiIbanExtension)
const convert = require('joi-to-json-schema')
const { name, description, options, mandatory } = require('./common')

const schema = Joi.object()
  .keys({
    name,
    goal: description,
    ...mandatory,
  })
  .unknown()

schema.options = options

module.exports = schema
module.exports.docs = {
  description: 'Programs service containing steps, users and a goal',
  definitions: {
    programs: convert(schema),
    programs_list: {
      type: 'array',
      items: {
        $ref: '#/definitions/programs',
      },
    },
  },
}
