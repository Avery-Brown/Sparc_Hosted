// const mount = require('@vue/test-utils').mount
// const Component = require('../pages/Contact')
import { mount } from '@vue/test-utils'
import Component from '../pages/Contact'

describe('Component', () => {
    test('is a Vue instance', () => {
      const wrapper = mount(Component)
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
