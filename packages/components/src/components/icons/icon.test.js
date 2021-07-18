import { mount } from '@vue/test-utils'
import Icon from './Icon'
import { types } from './types'

describe('Icon', () => {
  describe('component', () => {
    test('should be a Vue instance', () => {
      const wrapper = mount(Icon, {
        propsData: {
          type: 'play'
        }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })

  describe('props', () => {
    const props = [
      {
        prop: 'background',
        value: '#fff'
      },
      {
        prop: 'color',
        value: '#fff'
      },
      {
        prop: 'size',
        value: 20
      }
    ]

    types.forEach((type) => {
      props.forEach(({ prop, value }) => {
        test(`should render type '${type}' with prop ${prop}`, async () => {
          const wrapper = await mount(Icon, {
            propsData: {
              [prop]: value,
              type
            }
          })

          expect(wrapper.element).toMatchSnapshot()
        })
      })
    })
  })
})
