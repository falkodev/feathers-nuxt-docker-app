const params = {
  SERVICE_KEY: Symbol.for('service'),
  ROLES: [
    'administrator',
    'technical administrator',
    'facilitator leader',
    'facilitator',
    'program leader',
    'participant',
  ],
}

module.exports = params

module.exports.docs = {
  description: 'Constants',
  definitions: {
    constants: params.ROLES,
    constants_list: {
      type: 'array',
      items: {
        $ref: '#/definitions/constants',
      },
    },
  },
}
