module.exports = function(service, name) {
  service.docs = require(`../../domain/${name}`).docs
  return service
}
