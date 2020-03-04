import { mount } from '@vue/test-utils'
import ProgressBar from './ProgressBar'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { disableGhost } from '@podlove/player-actions/progress'

describe('ProgressBar', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(ProgressBar)

      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })

  describe('props', () => {
    test('should render with default props', async () => {
      const wrapper = await mount(ProgressBar)

      expect(wrapper.element).toMatchSnapshot()
    })

    const props = [
      {
        prop: 'time',
        value: 5000
      },
      {
        prop: 'ghost',
        value: 30
      },
      {
        prop: 'buffer',
        value: [
          [0, 1000],
          [5000, 6000]
        ]
      },
      {
        prop: 'quantiles',
        value: [
          [0, 300],
          [5500, 6000]
        ]
      },
      {
        prop: 'progressColor',
        value: '#fff'
      },
      {
        prop: 'thumbColor',
        value: '#fff'
      },
      {
        prop: 'highlightColor',
        value: '#fff'
      },
      {
        prop: 'title',
        value: 'title'
      },
      {
        prop: 'chapters',
        value: [1000, 5000]
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should render '${prop}'`, async () => {
        const wrapper = await mount(ProgressBar, {
          propsData: {
            [prop]: value,
            duration: 10000
          }
        })

        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })

  describe('events', () => {
    test('should emit REQUEST_PLAYTIME on input event', async () => {
      const wrapper = await mount(ProgressBar, {
        propsData: {
          duration: 10000
        }
      })

      wrapper.find('input').trigger('input')

      expect(wrapper.emitted('input')).toEqual([[requestPlaytime('0')]])
    })

    test('should emit REQUEST_PLAYTIME on input event', async () => {
      const wrapper = await mount(ProgressBar, {
        propsData: {
          duration: 10000
        }
      })

      wrapper.find('input').trigger('input')

      expect(wrapper.emitted('input')).toEqual([[requestPlaytime('0')]])
    })

    test('should emit DISABLE_GHOST on input event', async () => {
      const wrapper = await mount(ProgressBar, {
        propsData: {
          duration: 10000
        }
      })

      wrapper.find('input').trigger('input')

      expect(wrapper.emitted('ghost')).toEqual([[disableGhost()]])
    })
  })
})
