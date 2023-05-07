<template>
  <button
    :data-test="`podlove-component-stepper-button--${type}`"
    class="podlove-component-stepper-button opacity-100 hover:opacity-75"
    @click="clickHandler"
  >
    <icon :type="type" />
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { stepForward, stepBackwards } from '@podlove/player-actions/stepper';
import Icon from '../icons';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (val: 'forward' | 'backwards') => ['forward', 'backwards'].includes(val)
  }
});

const emits = defineEmits(['forward', 'backwards']);

const clickHandler = () => {
  switch (props.type) {
    case 'forward':
      emits('forward', stepForward());
      break;
    case 'backwards':
      emits('backwards', stepBackwards());
      break;
  }
};
</script>

<style lang="postcss" scoped>
.podlove-component-stepper-button {
  --podlove-component-icon-color: var(
    --podlove-component-stepper-button-color,
    var(--podlove-components-text)
  );
}
</style>
