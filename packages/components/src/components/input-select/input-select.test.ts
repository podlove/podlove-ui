import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import InputSelect from './InputSelect.vue';

describe('InputSelect', () => {
  describe('component', () => {
    test('should be a Vue instance', () => {
      const wrapper = mount(InputSelect);
      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe('props', () => {
    test('should render with default props', () => {
      const wrapper = mount(InputSelect);
      expect(wrapper.element).toMatchSnapshot();
    });

    const props = [
      {
        prop: 'disabled',
        value: true
      },
      {
        prop: 'color',
        value: '#fff'
      },
      {
        prop: 'background',
        value: '#fff'
      },
      {
        prop: 'borderColor',
        value: '#fff'
      },
      {
        prop: 'value',
        value: 'foo'
      }
    ];

    props.forEach(({ prop, value }) => {
      test(`should render type '${prop}'`, async () => {
        const wrapper = await mount(InputSelect, {
          props: {
            [prop]: value,
            options: ['foo', 'bar', 'baz']
          }
        });

        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('events', () => {
    test('should dispatch change event on change', async () => {
      const wrapper = await mount(InputSelect, {
        props: {
          options: ['foo', 'bar', 'baz'],
          value: 'bar'
        }
      });

      await wrapper.trigger('change');
      expect(wrapper.emitted().change).toEqual([['bar']]);
    });
  });
});
