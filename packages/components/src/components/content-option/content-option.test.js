import { mount } from '@vue/test-utils'
import { selectContent } from '@podlove/player-actions/share'
import ContentOption from './ContentOption'

describe('ContentOption', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(ContentOption)
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('props', () => {
    test('should render a default', async () => {
      const wrapper = await mount(ContentOption)
      expect(wrapper.element).toMatchSnapshot()
    })

    const props = [
      {
        prop: 'content',
        value: 'test content'
      },
      {
        prop: 'title',
        value: 'test title'
      },
      {
        prop: 'type',
        value: 'test type'
      },
      {
        prop: 'a11y',
        value: 'test a11y'
      },
      {
        prop: 'background',
        value: '#fff'
      },
      {
        prop: 'color',
        type: '#fff'
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should render with prop ${prop}`, async () => {
        const wrapper = await mount(ContentOption, {
          propsData: {
            [prop]: value
          }
        })

        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })

  describe('events', () => {
    test('should emit SELECT_CONTENT on click', async () => {
      const wrapper = await mount(ContentOption, {
        propsData: {
          type: 'foobar'
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted('click')).toEqual([[selectContent('foobar')]])
    })
  })
})
