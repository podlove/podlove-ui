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
    <circle
      cx="12"
      cy="12"
      r="11.45"
      stroke="currentColor"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect x="9" y="8" width="2" height="8" rx="1" fill="currentColor" />
    <rect x="13" y="8" width="2" height="8" rx="1" fill="currentColor" />
  </icon>
</template>
