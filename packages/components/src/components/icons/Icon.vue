<script setup lang="ts">
import { types } from './types';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (val: string) => Object.keys(types).includes(val)
  },
  size: {
    type: Number,
    default: undefined
  },
  filled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <component
    :is="types[props.type]"
    class="podlove-component-icon"
    :size="size"
    :filled="filled"
    aria-hidden="true"
  />
</template>

<style lang="postcss">
.podlove-component-icon {
  color: var(--podlove-component-icon-color, 'currentColor');
  background: var(--podlove-component-icon-background, 'transparent');
}
</style>
