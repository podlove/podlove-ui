<script setup lang="ts">
defineProps<{
  title: string;
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const update = (event: Event) => {
  emit('update:modelValue', (event.target as any).value);
};
</script>

<template>
  <label
    class="
      histoire-wrapper
      htw-p-2
      hover:htw-bg-primary-100
      dark:hover:htw-bg-primary-800
      htw-flex htw-gap-2 htw-flex-wrap
      histoire-text
      htw-cursor-text htw-items-center
      histoire-controls-component-prop-item histoire-controls-component-prop-item
    "
    ><span
      class="htw-w-28 htw-whitespace-nowrap htw-text-ellipsis htw-overflow-hidden htw-shrink-0"
      >{{ title }}</span
    ><span class="htw-grow htw-max-w-full htw-flex htw-items-center htw-gap-1">
      <input type="color" :value="modelValue" @input="update($event)" />
    </span>
  </label>
</template>

<style lang="postcss">
input[type='color'] {
  background: transparent;
}

input[type='color']::-webkit-color-swatch {
  border-radius: 0.25em;
  padding: 0.25em;
  border-color: rgb(0 0 0 / 0.25);
}

input[type='color']::-webkit-color-swatch:hover {
  border-color: rgb(var(--_histoire-color-primary-500) / var(--tw-border-opacity));
}

@media (prefers-color-scheme: dark) {
  input[type='color']::-webkit-color-swatch {
    border-color: rgb(255 255 255 / 0.25);
  }

  input[type='color']::-webkit-color-swatch:hover {
    border-color: rgb(var(--_histoire-color-primary-500) / var(--tw-border-opacity));
  }
}
</style>
