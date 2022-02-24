const { authenticate } = require('@feathersjs/authentication').hooks
const schema = require('../../../domain/programs')
const { validate } = require('../../../domain/common/validate.hooks')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [validate(schema, schema.options)],
    update: [validate(schema, schema.options)],
    patch: [validate(schema, schema.options)],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
