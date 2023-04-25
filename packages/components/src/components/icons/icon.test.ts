import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Icon from './Icon.vue';
import { types } from './types';

describe('Icon', () => {
  describe('component', () => {
    test('should be a Vue instance', () => {
      const wrapper = mount(Icon, {
        props: {
          type: 'play'
        }
      });
      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe('props', () => {
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
        prop: 'size',
        value: 20
      }
    ];

    Object.keys(types).forEach((type) => {
      props.forEach(({ prop, value }) => {
        test(`should render type '${type}' with prop ${prop}`, async () => {
          const wrapper = await mount(Icon, {
            props: {
              [prop]: value,
              type
            }
          });

          expect(wrapper.element).toMatchSnapshot();
        });
      });
    });
  });
});
