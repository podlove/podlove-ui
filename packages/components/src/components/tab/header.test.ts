import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import TabHeader from './Header.vue';

describe('TabHeader', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(TabHeader, {
        slots: {
          default: '<span>Inner Tab Header</span>'
        }
      });

      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe('props', () => {
    test('should render without props', async () => {
      const wrapper = await mount(TabHeader, {
        slots: {
          default: '<span>Inner Tab Header</span>'
        }
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    test(`should render with prop backgroundActive`, async () => {
      const wrapper = await mount(TabHeader, {
        slots: {
          default: '<span>Inner Tab Header</span>'
        },
        props: {
          backgroundActive: '#fff'
        }
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
