const docMixin = require('./docs')
module.exports = function(app) {
  app.mixins.push((service, name) => docMixin(service, name))
}
