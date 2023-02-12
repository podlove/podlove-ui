<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 24
  }
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="7" y="4" width="3" height="16" rx="1.5" fill="currentColor" />
    <rect x="14" y="4" width="3" height="16" rx="1.5" fill="currentColor" />
  </svg>
</template>
