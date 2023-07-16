<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 11
  }
});
</script>

<template>
  <icon :width="size" :height="size * 0.545" viewBox="0 0 11 6">
    <path d="M5.5 0.5L0 6L11 6L5.5 0.5Z" fill="currentColor" />
  </icon>
</template>
