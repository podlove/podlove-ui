import { mount } from '@vue/test-utils'
import Card from './Card'

describe('Card', () => {
  describe('component', () => {
    test('should be a Vue instance', () => {
      const wrapper = mount(Card)
      expect(wrapper.vm).toBeTruthy()
    })

    test('should provide defaults', async () => {
      const wrapper = await mount(Card, {
        slots: {
          default: '<span>Card Inner</span>'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('props', () => {
    const props = [
      {
        prop: 'headerColor',
        value: '#fff'
      },
      {
        prop: 'backgroundColor',
        value: '#fff'
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should have a property for ${prop}`, async () => {
        const wrapper = await mount(Card, {
          slots: {
            default: '<span>Card Inner</span>'
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
