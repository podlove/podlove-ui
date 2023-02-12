<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  },

  value: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <input
    class="
      podlove-input-text
      box-border
      inline-block
      resize-none
      p-1
      border border-solid
      rounded-sm
      h-8
    "
    :disabled="disabled"
    :value="value"
  />
</template>

<style lang="postcss" scoped>
.podlove-input-text {
  background: var(--podlove-component-input-text-background, var(--podlove-components-text));
  border-color: var(--podlove-component-input-text-border, var(--podlove-components-background));
  color: var(--podlove-component-input-text-color, var(--podlove-components-background));
}
</style>
