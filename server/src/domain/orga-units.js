const BaseJoi = require('joi')
const JoiIbanExtension = require('joi-iban-extension')
const Joi = BaseJoi.extend(JoiIbanExtension)
const convert = require('joi-to-json-schema')
const { name, description, options, mandatory } = require('./common')

const address = Joi.object().keys({
  street: Joi.string().allow(null, ''),
  city: Joi.string().allow(null, ''),
  postCode: Joi.string().allow(null, ''),
  country: Joi.string().allow(null, ''),
  building: Joi.string().allow(null, ''),
  floor: Joi.string().allow(null, ''),
  department: Joi.string().allow(null, ''),
})

const schema = Joi.object()
  .keys({
    name,
    description,
    mainAddress: address,
    invoiceAddress: address,
    bankAccount: Joi.string()
      // .iban()
      .allow(null, ''),
    _programIds: Joi.array(),
    ...mandatory,
  })
  .unknown()

schema.options = options

module.exports = schema
module.exports.docs = {
  description: 'Organisation units service containing company informations',
  definitions: {
    'orga-units': convert(schema),
    'orga-units_list': {
      type: 'array',
      items: {
        $ref: '#/definitions/orga-units',
      },
    },
  },
}
