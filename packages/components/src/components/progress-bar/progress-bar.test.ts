import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { disableGhost } from '@podlove/player-actions/progress';

import ProgressBar from './ProgressBar.vue';

describe('ProgressBar', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(ProgressBar);

      expect(wrapper.vm).toBeTruthy();
    });
  });

  const props = {
    duration: 10000,
    time: 5000,
    ghost: 30,
    buffer: [
      [0, 1000],
      [5000, 6000]
    ],
    quantiles: [
      [0, 300],
      [5500, 6000]
    ],
    title: 'title',
    chapters: [
      { start: 0, end: 1000 },
      { start: 1000, end: 5000 },
      { start: 5000, end: 10000 }
    ]
  };

  describe('props', () => {
    test('should render with default props', async () => {
      const wrapper = await mount(ProgressBar);

      expect(wrapper.element).toMatchSnapshot();
    });

    test(`should render with custom props`, async () => {
      const wrapper = await mount(ProgressBar, {
        props
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('events', () => {
    test('should emit REQUEST_PLAYTIME on input event', async () => {
      const wrapper = await mount(ProgressBar, {
        props
      });

      await wrapper.find('input').trigger('input');
      expect(wrapper.emitted().ghost).toEqual([[disableGhost()]]);
      expect(wrapper.emitted().time).toEqual([[requestPlaytime(5000)]]);
    });

    test('should emit REQUEST_PLAYTIME on input event', async () => {
      const wrapper = await mount(ProgressBar, {
        props
      });

      await wrapper.find('input').trigger('input');

      expect(wrapper.emitted().ghost).toEqual([[disableGhost()]]);
      expect(wrapper.emitted().time).toEqual([[requestPlaytime(5000)]]);
    });

    test('should emit DISABLE_GHOST on input event', async () => {
      const wrapper = await mount(ProgressBar, {
        props
      });

      await wrapper.find('input').trigger('input');

      expect(wrapper.emitted().ghost).toEqual([[disableGhost()]]);
      expect(wrapper.emitted().time).toEqual([[requestPlaytime(5000)]]);
    });
  });
});
