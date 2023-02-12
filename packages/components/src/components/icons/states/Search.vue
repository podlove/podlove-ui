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
    <circle cx="10" cy="11" r="5.35" stroke="currentColor" stroke-width="1.3" />
    <path d="M14 15L18.5 19.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
  </svg>
</template>
