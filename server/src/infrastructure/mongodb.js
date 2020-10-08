const parse = require('mongodb-core').parseConnectionString
const MongoClient = require('mongodb').MongoClient

module.exports = function(app) {
  if (app.get('testMode')) {
    app.set('mongoClient', {})
  } else {
    const config = app.get('mongodb')
    const promise = MongoClient.connect(config, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(client => {
        // For mongodb <= 2.2
        if (client.collection) {
          return client
        }

        const dbName = parse(config, () => {})
        return client.db(dbName)
      })
      .catch(error => app.get('logger').error('error in mongoClient', error))

    app.set('mongoClient', promise)
  }
}
