<script lang="ts" setup>
import { path } from 'ramda';

defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  },
  value: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['change']);

const changeEvent = (event: Event) => {
  emit('change', path(['target', 'value'], event));
};
</script>

<template>
  <select
    v-if="options"
    class="podlove-component-select block w-full border rounded-none p-1 h-8"
    :disabled="disabled"
    :value="value"
    @change="changeEvent"
  >
    <option v-for="(option, index) in options" :key="index" :selected="option === value">
      {{ option }}
    </option>
  </select>
  <select v-else class="podlove-component-select" :disabled="disabled" @change="changeEvent">
    <slot />
  </select>
</template>

<style lang="postcss" scoped>
.podlove-component-select {
  color: var(--podlove-component--input-select--color, var(--podlove-components-background));
  background: var(--podlove-component--input-select--background, var(--podlove-components-text));
  border-color: var(--podlove-component--input-select--border, var(--podlove-components-background));
}
</style>
