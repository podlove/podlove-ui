import { mount } from '@vue/test-utils'
import { nextChapter, previousChapter } from '@podlove/player-actions/src/chapters'
import { describe, test, expect } from 'vitest';

import ChapterButton from './ChapterButton.vue'

describe('ChapterButton', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(ChapterButton, {
        props: {
          type: 'next'
        }
      })

      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('props', () => {
    const types = ['next', 'previous']

    types.forEach((type) => {
      test(`should render type '${type}' with prop color`, async () => {
        const wrapper = await mount(ChapterButton, {
          props: {
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
        props: {
          type: 'next'
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted().next).toEqual([[nextChapter()]])
    })

    test('should emit PREVIOUS_CHAPTER on next click', async () => {
      const wrapper = await mount(ChapterButton, {
        props: {
          type: 'previous'
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted().previous).toEqual([[previousChapter()]])
    })
  })
})
