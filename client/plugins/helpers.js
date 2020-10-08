import feathersClient from '../feathers-client'

export async function setUserInStore(store) {
  if (process.client && !store.state.auth.user) {
    await feathersClient.authentication.setAccessToken(store.state.auth.accessToken)
    const { user } = await feathersClient.reAuthenticate(true)
    await store.commit('auth/setUser', user)
    return user
  }

  return store.state.auth.user
}
