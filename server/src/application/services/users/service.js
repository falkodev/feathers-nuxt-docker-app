const { Instance } = require('@db/users')
const hooks = require('@domain/users/hooks')

module.exports = function(app) {
  app
    .use('/users', new Instance({ paginate: app.get('paginate') }, app))
    .service('users')
    .hooks(hooks)
}
