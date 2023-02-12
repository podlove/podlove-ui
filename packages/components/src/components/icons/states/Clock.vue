<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 20
  }
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 20 20">
    <circle fill="none" stroke="currentColor" stroke-width="1.1" cx="10" cy="10" r="9" />
    <rect x="9" y="4" width="1" height="7" />
    <path fill="none" stroke="currentColor" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625" />
  </svg>
</template>
