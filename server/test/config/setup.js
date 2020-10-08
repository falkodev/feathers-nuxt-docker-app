const app = require('../../src/application/server')

module.exports = async () => {
  const server = app.listen(app.get('port'))
  global.__server__ = server
}
