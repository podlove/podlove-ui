import { mount } from '@vue/test-utils'
import { setChapter } from '@podlove/player-actions/chapters'
import { disableGhost } from '@podlove/player-actions/progress'
import { requestPlay } from '@podlove/player-actions/play'

import ChapterProgress from './ChapterProgress'

describe('ChapterProgress', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(ChapterProgress)

      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('props', () => {
    test('should render without props', async () => {
      const wrapper = await mount(ChapterProgress)
      expect(wrapper.element).toMatchSnapshot()
    })

    const props = [
      {
        prop: 'chapter',
        value: {
          start: 0,
          end: 50,
          title: 'chapter title',
          href: 'http://foo.bar',
          linkTitle: 'link title',
          active: true
        }
      },
      {
        prop: 'showLink',
        value: true
      },
      {
        prop: 'playtime',
        value: 25
      },
      {
        prop: 'progressColor',
        value: '#fff'
      }
    ]

    props.forEach(({ prop, value }) => {
      test(`should render '${prop}'`, async () => {
        const wrapper = await mount(ChapterProgress, {
          props: {
            [prop]: value
          }
        })

        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })

  describe('computed', () => {
    test('should render the remaining time accordingly', async () => {
      const chapterActive = await mount(ChapterProgress, {
        props: {
          chapter: {
            start: 0,
            end: 50,
            title: 'chapter title',
            href: 'http://foo.bar',
            linkTitle: 'link title',
            active: true
          },
          playtime: 20
        }
      })

      expect(chapterActive.componentVM.remainingTime).toEqual(30)

      const ghostActive = await mount(ChapterProgress, {
        props: {
          chapter: {
            start: 0,
            end: 50,
            title: 'chapter title',
            href: 'http://foo.bar',
            linkTitle: 'link title',
            active: false
          },
          ghost: 30,
          ghostActive: true
        }
      })

      expect(ghostActive.componentVM.remainingTime).toEqual(20)

      const defaultActive = await mount(ChapterProgress, {
        props: {
          chapter: {
            start: 0,
            end: 50,
            title: 'chapter title',
            href: 'http://foo.bar',
            linkTitle: 'link title',
            active: false
          }
        }
      })

      expect(defaultActive.componentVM.remainingTime).toEqual(50)
    })
  })

  describe('events', () => {
    test('should emit SET_CHAPTER on progress click', async () => {
      const wrapper = await mount(ChapterProgress, {
        props: {
          chapter: {
            start: 0,
            end: 50,
            title: 'chapter title',
            href: 'http://foo.bar',
            linkTitle: 'link title',
            active: true,
            index: 2
          }
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted().chapter).toEqual([[setChapter(1)]])
    })

    test('should emit REQUEST_PLAY on progress click', async () => {
      const wrapper = await mount(ChapterProgress, {
        props: {
          chapter: {
            start: 0,
            end: 50,
            title: 'chapter title',
            href: 'http://foo.bar',
            linkTitle: 'link title',
            active: true,
            index: 2
          }
        }
      })

      wrapper.trigger('click')
      expect(wrapper.emitted().play).toEqual([[requestPlay()]])
    })

    test('should emit DISABLE_GHOST on mouse out', async () => {
      const wrapper = await mount(ChapterProgress, {
        props: {
          chapter: {
            start: 0,
            end: 50,
            title: 'chapter title',
            href: 'http://foo.bar',
            linkTitle: 'link title',
            active: true,
            index: 2
          }
        }
      })

      wrapper.trigger('mouseout')
      expect(wrapper.emitted().ghost).toEqual([[disableGhost()]])
    })
  })
})
