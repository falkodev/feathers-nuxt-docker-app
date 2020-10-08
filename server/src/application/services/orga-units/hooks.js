const { authenticate } = require('@feathersjs/authentication').hooks
const { fastJoin } = require('feathers-hooks-common')
const schema = require('../../../domain/orga-units')
const { validate, validateKeys, getValuesFromForeignKeys } = require('../../common/validate.hooks')

// enrich returned items with values from foreign keys
const resolvers = {
  joins: {
    _programs: () => async (post, hook) => {
      post._programs = await getValuesFromForeignKeys(hook, 'programs', post)
    },
  },
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [validate(schema, schema.options), hook => validateKeys(hook, 'programs')],
    update: [validate(schema, schema.options), hook => validateKeys(hook, 'programs')],
    patch: [validate(schema, schema.options), hook => validateKeys(hook, 'programs')],
    remove: [],
  },

  after: {
    all: [fastJoin(resolvers)],
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
