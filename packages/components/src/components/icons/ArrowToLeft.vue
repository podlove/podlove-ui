<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 16
  }
});
</script>

<template>
  <icon :width="size" :height="size" viewBox="0 0 16 16">
    <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-linecap="round" />
  </icon>
</template>
