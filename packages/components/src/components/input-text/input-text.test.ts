import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import InputText from './InputText.vue';

describe('InputText', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(InputText);

      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe('props', () => {
    test('should render without props', async () => {
      const wrapper = await mount(InputText);
      expect(wrapper.element).toMatchSnapshot();
    });

    const props = [
      {
        prop: 'disabled',
        value: true
      },
      {
        prop: 'value',
        value: 'input-value'
      },
      {
        prop: 'color',
        value: '#fff'
      },
      {
        prop: 'borderColor',
        value: '#fff'
      },
      {
        prop: 'background',
        value: '#fff'
      },
      {
        prop: 'block',
        value: true
      }
    ];

    props.forEach(({ prop, value }) => {
      test(`should render type '${prop}'`, async () => {
        const wrapper = await mount(InputText, {
          props: {
            [prop]: value
          }
        });

        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});
