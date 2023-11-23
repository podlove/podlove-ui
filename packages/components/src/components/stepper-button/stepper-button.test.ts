import { mount } from '@vue/test-utils';
import { stepForward, stepBackwards } from '@podlove/player-actions/stepper';
import { describe, test, expect } from 'vitest';

import StepperButton from './StepperButton.vue';

describe('StepperButton', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(StepperButton, {
        props: {
          type: 'forward'
        }
      });

      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe('props', () => {
    const types = ['forward', 'backwards'];

    types.forEach((type) => {
      test(`should render for rype ${type}`, async () => {
        const wrapper = await mount(StepperButton, {
          props: {
            type,
            color: '#fff'
          }
        });

        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('events', () => {
    test('should emit STEP_FORWARD on type forward click', async () => {
      const wrapper = await mount(StepperButton, {
        props: {
          type: 'forward'
        }
      });

      wrapper.trigger('click');

      expect(wrapper.emitted().forward).toEqual([[stepForward()]]);
    });

    test('should emit STE_BACKWARD on type backward click', async () => {
      const wrapper = await mount(StepperButton, {
        props: {
          type: 'backwards'
        }
      });

      wrapper.trigger('click');

      expect(wrapper.emitted().backwards).toEqual([[stepBackwards()]]);
    });
  });
});
