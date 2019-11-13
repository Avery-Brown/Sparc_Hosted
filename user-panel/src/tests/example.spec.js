import { mount } from '@vue/test-utils'
import Contact from '../pages/Contact'
import About from '../pages/About'

describe('Contact', () => {
  test('Contact is a Vue instance', () => {
    const wrapper = mount(Contact)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('About', () => {
  test('About is a Vue instance yea', () => {
    const wrapper = mount(About)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
