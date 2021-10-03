import { mount } from '@vue/test-utils'

import TabHeader from './Header'

describe('TabHeader', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(TabHeader)

      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('props', () => {
    test('should render without props', async () => {
      const wrapper = await mount(TabHeader, {
        slots: {
          icon: '<span>Icon</span>',
          title: '<span>title</span>'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    const props = [
      {
        prop: 'index',
        value: 5
      },
      {
        prop: 'name',
        value: 'tab-name'
      },
      {
        prop: 'active',
        value: false
      },
      {
        prop: 'display',
        value: 'fixed'
      },
      {
        prop: 'color',
        value: '#fff'
      },
      {
        prop: 'background',
        value: '#fff'
      },
      {
        prop: 'colorActive',
        value: '#fff'
      },
      {
        prop: 'backgroundActive',
        value: '#fff'
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should render with prop ${prop}`, async () => {
        const wrapper = await mount(TabHeader, {
          slots: {
            icon: '<span>Icon</span>',
            title: '<span>title</span>'
          },
          props: {
            [prop]: value
          }
        })

        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })
})
