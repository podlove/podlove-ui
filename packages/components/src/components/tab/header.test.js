import { mount } from '@vue/test-utils'

import TabBody from './Body'

describe('TabBody', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(TabBody, {
        slots: {
          default: '<div>Inner Tab</div>'
        }
      })

      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('props', () => {
    test('should render without props', async () => {
      const wrapper = await mount(TabBody, {
        slots: {
          default: '<div>Inner Tab</div>'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    const props = [
      {
        prop: 'active',
        value: true
      },
      {
        prop: 'name',
        value: 'tab-name'
      },
      {
        prop: 'background',
        value: '#fff'
      },
      {
        prop: 'fixed',
        value: true
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should render with prop ${prop}`, async () => {
        const wrapper = await mount(TabBody, {
          slots: {
            default: '<div>Inner Tab</div>'
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
