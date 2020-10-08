const { Ability, AbilityBuilder } = require('@casl/ability')
const { SERVICE_KEY } = require('./constants')

/**
 * Defines how to detect object's type: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
 */
function subjectName(item) {
  if (!item || typeof item === 'string') {
    return item
  }

  return item[SERVICE_KEY]
}

function defineAbilitiesFor(user) {
  const { rules, can } = AbilityBuilder.extract()

  if (user) {
    can('create', 'users')
    can(['read', 'update'], 'users', { _id: user._id })
    if (user.roles && user.roles.includes('administrator')) {
      can('manage', 'all')
    }
  }

  return new Ability(rules, { subjectName })
}

module.exports = defineAbilitiesFor
