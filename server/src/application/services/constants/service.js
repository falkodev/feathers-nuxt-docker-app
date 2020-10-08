const hooks = require('./hooks')
const { ROLES } = require('../../../domain/constants')

module.exports = function(app) {
  app
    .use('/constants', {
      async find() {
        return {
          total: ROLES.length,
          limit: 100,
          skip: 0,
          data: ROLES,
        }
      },
    })
    .service('constants')
    .hooks(hooks)
}
