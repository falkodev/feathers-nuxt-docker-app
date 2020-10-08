import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client'

// Extend the base class
class Constant extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Constant'
  static instanceDefaults() {
    return {
      roles: [],
    }
  }
}
const servicePath = 'constants'
const servicePlugin = makeServicePlugin({
  Model: Constant,
  service: feathersClient.service(servicePath),
  servicePath,
})

// Optionally add service-level hooks, here:
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
})

export default servicePlugin
