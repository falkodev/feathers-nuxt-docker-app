// Application hooks that run for every service
const { when } = require('feathers-hooks-common')
const authorize = require('./common/access.hooks')
const authenticate = require('./common/authenticate.hooks')

async function updatedAt(hook) {
  try {
    const existingItem = await hook.service.get(hook.id)
    hook.data.createdAt = existingItem.createdAt
    hook.data.updatedAt = new Date()
  } catch (error) {
    throw new Error(error.message)
  }

  return hook
}

function createdAt(hook) {
  const date = new Date()
  hook.data.createdAt = date
  hook.data.updatedAt = date

  return hook
}

module.exports = {
  before: {
    all: [when(hook => hook.params.provider && hook.path !== 'authentication', authenticate, authorize())],
    find: [],
    get: [],
    create: [createdAt],
    update: [updatedAt],
    patch: [updatedAt],
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
    all: [hook => console.log('error', require('util').inspect(hook.error, { colors: true, depth: 1 }))],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
