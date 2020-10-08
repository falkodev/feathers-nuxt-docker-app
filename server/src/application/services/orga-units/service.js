const { Instance } = require('./class')
const hooks = require('./hooks')

module.exports = function(app) {
  app
    .use('/orga-units', new Instance({ paginate: app.get('paginate') }, app))
    .service('orga-units')
    .hooks(hooks)
}
