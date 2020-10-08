import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'

import UploadCSV from '@/components/admin/UploadCSV.vue'

Vue.use(Vuetify)

describe('UploadCSV', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(UploadCSV)
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm.loading).toBeFalsy()
    expect(wrapper.find('button').attributes().disabled).toBe('disabled')
  })

  test('renders preview of CSV file', () => {
    // given
    const read = function() {
      this.preview = 'test3@test.com;lisa;test;test1\r\ntest4@test.com;lisa;test;test1'
    }
    wrapper.setMethods({ read })

    // when
    wrapper.vm.read()

    //then
    expect(wrapper.find('.preview').text()).toBe('test3@test.com;lisa;test;test1\n\ntest4@test.com;lisa;test;test1')
  })

  test('uploads file', () => {
    // given
    const read = function() {
      this.preview = 'test3@test.com;lisa;test;test1\r\ntest4@test.com;lisa;test;test1'
    }
    const stubMethod = jest.fn()
    wrapper.setMethods({ read, upload: stubMethod })

    // when
    wrapper.vm.read()
    wrapper.find('button').trigger('click')

    //then
    expect(stubMethod).toHaveBeenCalled()
  })
})
