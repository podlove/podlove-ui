import { mount } from '@vue/test-utils'
import { nextChapter, previousChapter } from '@podlove/player-actions/chapters'

import ChapterButton from './ChapterButton'

describe('ChapterButton', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(ChapterButton, {
        propsData: {
          type: 'next'
        }
      })

      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })

  describe('props', () => {
    const types = ['next', 'previous']

    types.forEach((type) => {
      test(`should render type '${type}' with prop color`, async () => {
        const wrapper = await mount(ChapterButton, {
          propsData: {
            color: '#fff',
            type
          }
        })

        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })

  describe('events', () => {
    test('should emit NEXT_CHAPTER on next click', async () => {
      const wrapper = await mount(ChapterButton, {
        propsData: {
          type: 'next'
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted('click')).toEqual([[nextChapter()]])
    })

    test('should emit PREVIOUS_CHAPTER on next click', async () => {
      const wrapper = await mount(ChapterButton, {
        propsData: {
          type: 'previous'
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted('click')).toEqual([[previousChapter()]])
    })
  })
})
