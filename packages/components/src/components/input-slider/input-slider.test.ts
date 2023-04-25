import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import InputSlider from './InputSlider.vue';

describe('InputSlider', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(InputSlider);

      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe('props', () => {
    test('should render without props', async () => {
      const wrapper = await mount(InputSlider);
      expect(wrapper.element).toMatchSnapshot();
    });

    const props = [
      {
        prop: 'step',
        value: 1
      },
      {
        prop: 'value',
        value: 3
      },
      {
        prop: 'pins',
        value: [
          {
            value: 1,
            label: 'pin-label-1'
          },
          {
            value: 4,
            label: 'pin-label-2'
          }
        ]
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
        prop: 'progressColor',
        value: '#fff'
      }
    ];

    props.forEach(({ prop, value }) => {
      test(`should render type '${prop}'`, async () => {
        const wrapper = await mount(InputSlider, {
          props: {
            min: 1,
            max: 20,
            [prop]: value
          }
        });

        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('events', () => {
    test('should dispatch input event on input', async () => {
      const wrapper = await mount(InputSlider, {
        props: {
          min: 1,
          max: 20,
          value: 1
        }
      });

      wrapper.find('input').trigger('input');
      expect(wrapper.emitted().sliderInput).toEqual([[1]]);
    });

    test('should dispatch change event on change', async () => {
      const wrapper = await mount(InputSlider, {
        props: {
          min: 1,
          max: 20,
          value: 1
        }
      });

      wrapper.find('input').trigger('change');
      expect(wrapper.emitted().sliderChange).toEqual([[ 1 ]]);
    });

    test('should dispatch dblclick event on dblclick', async () => {
      const wrapper = await mount(InputSlider, {
        props: {
          min: 1,
          max: 20,
          value: 1
        }
      });

      wrapper.find('input').trigger('dblclick');
      expect(wrapper.emitted().sliderDblclick).toEqual([[1]]);
    });
  });
});
