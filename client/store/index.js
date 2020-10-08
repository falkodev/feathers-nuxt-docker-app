import { initAuth } from 'feathers-vuex'
import auth from './auth'

const requireModule = require.context('./services', false, /.js$/)
const servicePlugins = requireModule.keys().map(modulePath => requireModule(modulePath).default)

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt',
    })
  },
}

export const plugins = [...servicePlugins, auth]
