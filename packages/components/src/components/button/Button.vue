<script setup lang="ts">
const props = defineProps<{
  href?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="
      podlove-component-button
      flex
      justify-center
      h-8
      text-base
      cursor-pointer
      bg-transparent
      outline-none
      transition-opacity
      hover:opacity-75
      border
      rounded
      border-solid
      py-1
      px-2
      uppercase
      text-center
    "
    :class="{ 'opacity-50': props.disabled, 'opacity-100': !props.disabled }"
    :href="props.href"
  >
    <span class="truncate w-full h-full flex items-center justify-center">
      <slot />
    </span>
  </component>
</template>

<style lang="postcss" scoped>
.podlove-component-button {
  font-variant: small-caps;
  color: var(--podlove-component-button-text, var(--podlove-components-background));
  background: var(--podlove-component-button-background, var(--podlove-components-text));
  border-color: var(--podlove-component-button-border, var(--podlove-components-background));
}

.podlove-component-button svg {
  display: inline;
}
</style>
