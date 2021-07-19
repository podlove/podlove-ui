import { mount } from '@vue/test-utils'
import Channel from './Channel'

describe('Channel', () => {
  describe('component', () => {
    test('should be a Vue instance', () => {
      const wrapper = mount(Channel, {
        propsData: {
          type: 'embed'
        }
      })
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('props', () => {
    const props = [
      {
        prop: 'color',
        value: '#fff'
      },
      {
        prop: 'link',
        value: 'http://foo.bar'
      },
      {
        prop: 'subject',
        value: 'test subject'
      },
      {
        prop: 'text',
        value: 'test text'
      },
      {
        prop: 'a11y',
        value: 'test a11y'
      },
      {
        prop: 'poster',
        value: 'http://foo.bar/test.jpg'
      }
    ]

    const types = ['embed', 'facebook', 'linkedin', 'mail', 'reddit', 'twitter', 'pinterest']

    types.forEach((type) => {
      props.forEach(({ prop, value }) => {
        test(`should render type '${type}' with prop ${prop}`, async () => {
          const wrapper = await mount(Channel, {
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
