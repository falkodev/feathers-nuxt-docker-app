import io from 'socket.io-client'
import feathersVuex from 'feathers-vuex'
import { CookieStorage } from 'cookie-storage'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'

const socket = io(process.env.API_URL || 'http://localhost:8080', { transports: ['websocket'] })

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: new CookieStorage() }))

export default feathersClient

const { makeServicePlugin, makeAuthPlugin, BaseModel, models, clients, FeathersVuex } = feathersVuex(feathersClient, {
  idField: '_id',
})

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, clients, FeathersVuex }
