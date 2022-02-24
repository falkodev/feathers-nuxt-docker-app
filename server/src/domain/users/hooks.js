const { authenticate } = require('@feathersjs/authentication').hooks
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks
const schema = require('../users')
const { validate } = require('../common/validate.hooks')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [validate(schema, schema.options), hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [
      async hook => {
        if (hook.data.password) {
          hook = await hashPassword('password')(hook)
        } else {
          const { password } = await hook.app.service('users').get(hook.id)
          hook.data.password = password
        }
        return hook
      },
      authenticate('jwt'),
    ],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
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
