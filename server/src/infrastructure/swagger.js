const swagger = require('feathers-swagger')
const pkg = require('../../package.json')
const config = require('config')

module.exports = swagger({
  uiIndex: true,
  specs: {
    info: {
      title: config.get('docs.title'),
      description: config.get('docs.description'),
      version: pkg.version,
    },
  },
})
