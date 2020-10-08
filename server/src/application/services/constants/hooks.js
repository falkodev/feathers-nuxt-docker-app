module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hook => (hook.result = {})],
    update: [hook => (hook.result = {})],
    patch: [hook => (hook.result = {})],
    remove: [hook => (hook.result = {})],
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
