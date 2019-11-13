const mount = require('@vue/test-utils').mount;
const Contact = require('../pages/Contact.vue')

describe('Contact', () => {
    test('is a Vue instance', () => {
      const wrapper = mount(Contact)
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })