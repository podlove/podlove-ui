import { mount } from '@vue/test-utils'
import InputGroup from './InputGroup'

describe('InputGroup', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(InputGroup)
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('slots', () => {
    test('should have a slot for inputs', async () => {
      const wrapper = await mount(InputGroup, {
        slots: {
          input: '<input type="text" />'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    test('should have a slot for buttons', async () => {
      const wrapper = await mount(InputGroup, {
        slots: {
          button: '<button>click!</button>'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    test('should apply special classes when having multiple slots', async () => {
      const wrapper = await mount(InputGroup, {
        slots: {
          button: '<button>click!</button>',
          input: ['<input type="text" />', '<input type="text" />']
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
