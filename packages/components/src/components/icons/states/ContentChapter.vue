<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 20
  }
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    ratio="1"
  >
    <rect x="6" y="4" width="12" height="1" fill="currentColor" />
    <rect x="6" y="9" width="12" height="1" fill="currentColor" />
    <rect x="6" y="14" width="12" height="1" fill="currentColor" />
    <rect x="2" y="4" width="2" height="1" fill="currentColor" />
    <rect x="2" y="9" width="2" height="1" fill="currentColor" />
    <rect x="2" y="14" width="2" height="1" fill="currentColor" />
  </svg>
</template>
