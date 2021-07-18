import { mount } from '@vue/test-utils'
import InputSelect from './InputSelect'

describe('InputSelect', () => {
  describe('component', () => {
    test('should be a Vue instance', () => {
      const wrapper = mount(InputSelect)
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })

  describe('props', () => {
    test('should render with default props', () => {
      const wrapper = mount(InputSelect)
      expect(wrapper.element).toMatchSnapshot()
    })

    const props = [
      {
        prop: 'disabled',
        value: true
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
        prop: 'borderColor',
        value: '#fff'
      },
      {
        prop: 'value',
        value: 'foo'
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should render type '${prop}'`, async () => {
        const wrapper = await mount(InputSelect, {
          propsData: {
            [prop]: value,
            options: ['foo', 'bar', 'baz']
          }
        })

        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })

  describe('events', () => {
    test('should dispatch change event on change', async () => {
      const wrapper = await mount(InputSelect, {
        propsData: {
          options: ['foo', 'bar', 'baz']
        }
      })

      wrapper.findAll('option').at(1).trigger('change')
      expect(wrapper.emitted('change')).toEqual([['bar']])
    })
  })
})
