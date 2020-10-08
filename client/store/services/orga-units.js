import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client'

// Extend the base class
class OrgaUnit extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  static modelName = 'OrgaUnit'
  static instanceDefaults() {
    return {
      name: '',
      description: '',
      mainAddress: {},
      invoiceAddress: {},
      bankAccount: '',
      contacts: {},
    }
  }
}
const servicePath = 'orga-units'
const servicePlugin = makeServicePlugin({
  Model: OrgaUnit,
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
