const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const compress = require('compression')
const favicon = require('serve-favicon')

const express = require('@feathersjs/express')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio')
const configuration = require('@feathersjs/configuration')

const mixins = require('./mixins')
const channels = require('./channels')
const services = require('./services')
const appHooks = require('../domain/server.hooks')
const middleware = require('./middleware')
const authentication = require('./authentication')
const logger = require('../infrastructure/logger')
const swagger = require('../infrastructure/swagger')
const mongoClient = require('../infrastructure/mongodb')

const app = express(feathers())

// Load app configuration
app.configure(configuration())

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
// Host the public folder
app.use('/', express.static(app.get('public')))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio())
app.configure(mongoClient)

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
app.configure(authentication)

// Configure documentation - `mixins` must be before `swagger`
app.configure(mixins)
app.configure(swagger)

// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))
app.set('logger', logger)
app.hooks(appHooks)

module.exports = app
