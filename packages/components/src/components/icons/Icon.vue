<script setup lang="ts">
import { types } from './types.js';

const props = defineProps<{
  type: keyof typeof types;
  size?: number;
  filled?: boolean;
}>();
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
