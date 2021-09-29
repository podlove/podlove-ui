import { mount } from '@vue/test-utils'
import { requestPlay, requestPause, requestRestart } from '@podlove/player-actions/play'
import PlayButton from './PlayButton'

describe('PlayButton', () => {
  beforeEach(() => {
    global.MutationObserver = class {
      constructor() {}
      disconnect() {}
      observe() {}
    }
  })

  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(PlayButton, {
        propsData: {
          type: 'play'
        }
      })

      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('props', () => {
    const types = ['play', 'pause', 'loading', 'restart']
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
        prop: 'label',
        value: 'test-label'
      }
    ]

    types.forEach((type) => {
      props.forEach(({ prop, value }) => {
        test(`should render type '${type}' with '${prop}'`, async () => {
          const wrapper = await mount(PlayButton, {
            propsData: {
              type,
              [prop]: value
            }
          })

          expect(wrapper.element).toMatchSnapshot()
        })
      })
    })
  })

  describe('events', () => {
    test('should dispatch REQUEST_PLAY on click with type play', async () => {
      const wrapper = await mount(PlayButton, {
        propsData: {
          type: 'play'
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted('click')).toEqual([[requestPlay()]])
    })

    test('should dispatch REQUEST_PAUSE on click with type play', async () => {
      const wrapper = await mount(PlayButton, {
        propsData: {
          type: 'pause'
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted('click')).toEqual([[requestPause()]])
    })

    test('should dispatch REQUEST_PLAY on click with type play', async () => {
      const wrapper = await mount(PlayButton, {
        propsData: {
          type: 'restart'
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted('click')).toEqual([[requestRestart()]])
    })
  })
})
