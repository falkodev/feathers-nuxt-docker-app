const { Instance } = require('./class')
const hooks = require('./hooks')

module.exports = function(app) {
  app
    .use('/programs', new Instance({ paginate: app.get('paginate') }, app))
    .service('programs')
    .hooks(hooks)
}
