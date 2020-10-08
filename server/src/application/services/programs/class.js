const { Service } = require('feathers-mongodb')

exports.Instance = class Instance extends Service {
  constructor(options, app) {
    super(options)

    if (!app.get('testMode')) {
      app
        .get('mongoClient')
        .then(db => {
          this.Model = db.collection('programs')
        })
        .catch(() => app.get('logger').error('no database'))
    }
  }
}
