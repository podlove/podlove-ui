<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 24
  }
});
</script>

<template>
  <icon
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
  >
    <rect x="7" y="4" width="3" height="16" rx="1.5" fill="currentColor" />
    <rect x="14" y="4" width="3" height="16" rx="1.5" fill="currentColor" />
  </icon>
</template>
