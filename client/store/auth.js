import { makeAuthPlugin } from '../feathers-client'

export default makeAuthPlugin({
  userService: 'users',
  state: {
    publicPages: ['login'],
  },
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}
