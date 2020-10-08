import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'

import Login from '@/components/Login.vue'

Vue.use(Vuetify)
Vue.use(Vuex)

describe('Login', () => {
  const snackbar = {
    namespaced: true,
    actions: { displaySnack: jest.fn() },
  }
  const auth = {
    namespaced: true,
    actions: { authenticate: jest.fn() },
  }
  const store = new Vuex.Store({
    modules: {
      snackbar,
      auth,
    },
  })

  let wrapper
  beforeEach(() => {
    wrapper = mount(Login, { store })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm.loading).toBeFalsy()
  })

  test('login fail', () => {
    wrapper.find('input[type=email]').setValue('test@app.com')
    wrapper.find('input[type=password]').setValue('xyz')
    wrapper.find('form').trigger('submit.prevent')

    expect(auth.actions.authenticate).toHaveBeenCalled()
  })

  test('login success', async () => {
    const stubMethod = jest.fn()
    wrapper.setMethods({ login: stubMethod })
    wrapper.find('input[type=email]').setValue('test@app.com')
    wrapper.find('input[type=password]').setValue('test')
    wrapper.find('form').trigger('submit.prevent')

    expect(stubMethod).toHaveBeenCalled()
  })
})
