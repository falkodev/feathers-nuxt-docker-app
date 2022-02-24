const { Ability } = require('@casl/ability')
const { toMongoQuery } = require('@casl/mongoose')
const { Forbidden } = require('@feathersjs/errors')
const defineAbilitiesFor = require('../../domain/access-control')
const { SERVICE_KEY } = require('../../domain/constants')

Ability.addAlias('update', 'patch')
Ability.addAlias('read', ['get', 'find'])

module.exports = function authorize(name = null) {
  return async function(hook) {
    const action = hook.method
    const service = name ? hook.app.service(name) : hook.service
    const serviceName = name || hook.path

    hook.params.ability = defineAbilitiesFor(hook.params.user)
    hook.params.query = hook.params.query || {}

    if (!hook.id) {
      Object.assign(hook.params.query, toMongoQuery(hook.params.ability, serviceName))
      return hook
    }

    const params = Object.assign({}, hook.params, { provider: null })
    const result = await service.get(hook.id, params)
    result[SERVICE_KEY] = serviceName

    if (hook.params.ability.cannot(action, result)) {
      throw new Forbidden(`You are not allowed to ${action} ${serviceName}`)
    }

    if (action === 'get') {
      hook.result = result
    }

    return hook
  }
}
