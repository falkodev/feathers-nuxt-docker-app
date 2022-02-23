const faker = require('faker')
const app = require('../../application/server')
const { ROLES } = require('../../domain/constants')

async function main() {
  try {
    const service = await app.service('users')
    await app.get('mongoClient')
    app.get('logger').info('Fixtures started ===>  Users <===')

    for (let i = 0; i < 5; i++) {
      const user = {
        job: faker.name.jobType(),
        email: faker.internet.email(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        password: 'test123',
        roles: [ROLES[i]],
      }
      await service.create(user)
      app.get('logger').info(`User ${i} created`)
    }
    app.get('logger').info('Fixtures created ===>  Users <===')
    process.exit(0)
  } catch (err) {
    app.get('logger').error('Fixtures in error ===>  Users <===', err.message)
    process.exit(1)
  }
}

module.exports = { main }
