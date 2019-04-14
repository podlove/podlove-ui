import { mount } from '@vue/test-utils'

import TabHeader from './Header'

describe('TabHeader', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(TabHeader, {
        slots: {
          default: '<span>Inner Tab Header</span>'
        }
      })

      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })

  describe('props', () => {
    test('should render without props', async () => {
      const wrapper = await mount(TabHeader, {
        slots: {
          default: '<span>Inner Tab Header</span>'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    test(`should render with prop backgroundActive`, async () => {
      const wrapper = await mount(TabHeader, {
        slots: {
          default: '<span>Inner Tab Header</span>'
        },
        propsData: {
          backgroundActive: '#fff'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
