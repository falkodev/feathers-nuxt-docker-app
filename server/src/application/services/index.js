const users = require('./users/service')
const constants = require('./constants/service')
const orgaUnits = require('./orga-units/service')
const programs = require('./programs/service')
module.exports = function(app) {
  app.configure(users)
  app.configure(constants)
  app.configure(orgaUnits)
  app.configure(programs)
}
