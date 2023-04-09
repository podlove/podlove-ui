<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const elements = ref(0);
const container = ref<HTMLElement | null>(null);

onMounted(() => {
  console.log(container.value)
  if (!container.value) {
    return;
  }

  elements.value = container.value.children.length;
})
</script>

<template>
  <div class="podlove-component-input-group h-8 box-border flex" :class="{ [`elements-${elements}`]: true }" ref="container">
    <slot name="button" />
    <slot name="input" />
  </div>
</template>

<style lang="scss">
$addon-button-width: 80px;

.podlove-component-input-group {
  .input-text,
  .input-select {
    padding: 0.25rem;
    width: 100%;
    border-radius: 0 3px 3px 0;
    border-width: 1px 1px 1px 0;
  }

  .button {
    width: $addon-button-width;
    display: block;
    border-width: 1px;
    border-radius: 3px 0 0 3px;
  }

  &.elements-2 {
    *:nth-child(1) {
      width: auto;
      border-radius: 3px 0 0 3px;
    }
  }

  &.elements-3 {
    *:nth-child(1) {
      width: auto;
      border-radius: 3px 0 0 3px;
    }

    *:nth-child(2) {
      width: auto;
      border-radius: 0;
    }
  }
}
</style>
