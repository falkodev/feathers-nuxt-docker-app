const memory = require('feathers-memory')
const feathers = require('@feathersjs/feathers')
const schema = require('../../src/domain/users')
const serverHooks = require('../../src/application/server.hooks')
const validate = require('../../src/application/common/validate.hooks')
const authorize = require('../../src/application/common/access.hooks')
const authenticate = require('../../src/application/common/authenticate.hooks')

describe('users service', () => {
  let app

  beforeEach(() => {
    app = feathers()
    app.use('/authentication', memory({}))
    app.use('/users', {
      async create(data) {
        return data
      },
      async find() {
        return 'test'
      },
    })

    // Register the `processMessage` hook on that service
    app.service('users').hooks({
      before: {
        create: validate(schema, schema.options),
        find: [authenticate, authorize()],
      },
    })
    app.hooks(serverHooks)
  })

  it('registered the service', () => {
    const service = app.service('users')
    expect(service).toBeTruthy()
  })

  it('creates a user', async () => {
    const user = await app.service('users').create({
      email: 'test@wap.com',
      password: 'test',
      firstName: 'firstName',
      lastName: 'lastName',
      roles: ['participant'],
    })
    expect(user).toHaveProperty('createdAt')
    expect(user).toHaveProperty('updatedAt')
  })

  it('does not create a user with missing required field', async () => {
    try {
      await app.service('users').create({
        email: 'test@wap.com',
        password: 'test',
        firstName: 'firstName',
        lastName: 'lastName',
      })
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error).toHaveProperty('errors.roles', '"roles" is required')
    }
  })
})
