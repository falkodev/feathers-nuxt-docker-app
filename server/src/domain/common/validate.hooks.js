const Joi = require('joi')
const errors = require('@feathersjs/errors')
const ObjectId = require('mongodb').ObjectID
const utils = require('feathers-hooks-common/lib/services')
const joiErrorsForForms = require('joi-errors-for-forms')

function validate(joiSchema, joiOptions, translations, ifTest) {
  const translator = joiErrorsForForms.form(translations)
  return validator(joiSchema, joiOptions, translator, ifTest)
}

function validator(joiSchema, joiOptions, translator, ifTest) {
  return function validatorInner(hook) {
    utils.checkContext(hook, 'before', ['create', 'update', 'patch'], 'validate-joi')
    const values = utils.getItems(hook)

    Joi.validate(values, joiSchema, joiOptions, function(joiErr, convertedValues) {
      const formErrors = translator(joiErr)
      if (formErrors) {
        const msg = ifTest ? JSON.stringify(formErrors) : 'Invalid data'
        throw new errors.BadRequest(msg, { errors: formErrors })
      }

      if (joiOptions.convert) {
        utils.replaceItems(hook, convertedValues)
      }

      return hook
    })
  }
}

async function getValuesFromForeignKeys(hook, foreignServiceName, post) {
  const propName = `_${foreignServiceName}Ids`
  if (!Array.isArray(post[propName])) {
    // convert string to array in case of one-to-one foreign key
    // i.e: post._usersIds = "test" ===> post._usersIds = ["test"]
    post[propName] = [post[propName]]
  }
  const objectIds = post[propName].map(foreignId => new ObjectId(foreignId)) // convert id as MongodDB ObjectId

  return hook.app.service(foreignServiceName).find({
    query: { _id: { $in: objectIds } },
  })
}

async function validateKeys(hook, foreignServiceName) {
  delete hook.data[`_${foreignServiceName}`] // remove values matching foreign key

  const foreignKey = `_${foreignServiceName}Ids`
  if (hook.data[foreignKey]) {
    const foreignService = await getValuesFromForeignKeys(hook, foreignServiceName, hook.data)

    if (foreignService.total < hook.data[foreignKey].length) {
      throw new Error(`At least one id in ${hook.service.path} ${foreignServiceName} is not valid`)
    }
  }

  return hook
}

module.exports = {
  validate,
  validateKeys,
  getValuesFromForeignKeys,
}
