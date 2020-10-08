import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client'

// Extend the base class
class Program extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'Program'
  static instanceDefaults() {
    return {
      name: '',
      goal: '',
    }
  }
}
const servicePath = 'programs'
const servicePlugin = makeServicePlugin({
  Model: Program,
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
