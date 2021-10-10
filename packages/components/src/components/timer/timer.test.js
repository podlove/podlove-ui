import { mount } from '@vue/test-utils'

import Timer from './Timer'

describe('Timer', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(Timer)

      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('props', () => {
    test('should render without props', async () => {
      const wrapper = await mount(Timer)

      expect(wrapper.element).toMatchSnapshot()
    })

    const props = [
      {
        prop: 'color',
        value: '#fff'
      },
      {
        prop: 'time',
        value: 360
      },
      {
        prop: 'remaining',
        value: true
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should render with prop ${prop}`, async () => {
        const wrapper = await mount(Timer, {
          props: {
            [prop]: value
          }
        })

        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })
})
