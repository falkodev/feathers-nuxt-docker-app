const { Instance } = require('./class')
const hooks = require('./hooks')

module.exports = function(app) {
  app
    .use('/users', new Instance({ paginate: app.get('paginate') }, app))
    .service('users')
    .hooks(hooks)
}
