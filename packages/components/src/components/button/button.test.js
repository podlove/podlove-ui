import { mount } from '@vue/test-utils'
import Button from './Button'

describe('Button', () => {
  describe('component', () => {
    test('should be a Vue instance', () => {
      const wrapper = mount(Button)
      expect(wrapper.vm).toBeTruthy()
    })

    test('should provide defaults', async () => {
      const wrapper = await mount(Button, {
        slots: {
          default: '<span>Button Inner</span>'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('props', () => {
    const props = [
      {
        prop: 'textColor',
        value: '#fff'
      },
      {
        prop: 'backgroundColor',
        value: '#fff'
      },
      {
        prop: 'borderColor',
        value: '#fff'
      },
      {
        prop: 'href',
        value: 'http://foo.bar'
      },
      {
        prop: 'disabled',
        value: true
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should have a property for ${prop}`, async () => {
        const wrapper = await mount(Button, {
          slots: {
            default: '<span>Button Inner</span>'
          },
          propsData: {
            [prop]: value
          }
        })

        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })
})
