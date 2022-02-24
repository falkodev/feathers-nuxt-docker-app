require('module-alias/register')
const app = require('./application/server')
const port = app.get('port')
const host = app.get('host')
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) => app.get('logger').error('Unhandled Rejection at: Promise ', p, reason))
server.on('listening', () => app.get('logger').info('Feathers application started on http://%s:%d', host, port))
