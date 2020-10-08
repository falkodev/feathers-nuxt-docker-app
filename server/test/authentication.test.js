const feathers = require('@feathersjs/feathers')
const memory = require('feathers-memory')

describe('authentication', () => {
  const app = feathers().use('/authentication', memory({}))

  it('registered the authentication service', () => {
    expect(app.service('authentication')).toBeTruthy()
  })

  describe('local strategy', () => {
    const userTest = {
      email: 'someone@example.com',
      password: 'supersecret',
      firstName: 'test',
      lastName: 'name',
    }

    it('authenticates user and creates accessToken', async () => {
      const { id, strategy } = await app.service('authentication').create({
        strategy: 'local',
        ...userTest,
      })

      expect(strategy).toBeTruthy()
      expect(id).toBeDefined()
    })
  })
})
