import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { setChapter } from '@podlove/player-actions/chapters';
import { disableGhost } from '@podlove/player-actions/progress';
import { requestPlay } from '@podlove/player-actions/play';

import ChapterProgress from './ChapterProgress.vue';

const props = {
  chapter: {
    start: 0,
    end: 50,
    index: 0,
    title: 'chapter title',
    href: 'http://foo.bar',
    linkTitle: 'link title',
    active: true
  },
  showLink: true,
  value: true,
  playtime: 25
};

describe('ChapterProgress', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(ChapterProgress, { props });

      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe('props', () => {
    test('should render', async () => {
      const wrapper = await mount(ChapterProgress, { props });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('computed', () => {
    test('should render the remaining time accordingly', async () => {
      const chapterActive = await mount(ChapterProgress, {
        props
      });
      expect((chapterActive as any).componentVM.remainingTime).toEqual(25);

      const ghostActive = await mount(ChapterProgress, {
        props: {
          chapter: { ...props.chapter, active: false },
          ghost: 30
        }
      });
      expect((ghostActive as any).componentVM.remainingTime).toEqual(20);

      const defaultActive = await mount(ChapterProgress, {
        props: {
          chapter: { ...props.chapter, active: false }
        }
      });

      expect((defaultActive as any).componentVM.remainingTime).toEqual(50);
    });
  });

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
      });

      wrapper.trigger('click');
      expect(wrapper.emitted().chapter).toEqual([[setChapter(1)]]);
    });

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
      });

      wrapper.trigger('click');
      expect(wrapper.emitted().play).toEqual([[requestPlay()]]);
    });

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
      });

      wrapper.trigger('mouseout');
      expect(wrapper.emitted().ghost).toEqual([[disableGhost()]]);
    });
  });
});
