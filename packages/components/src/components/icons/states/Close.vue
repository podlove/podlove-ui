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
    <path
      d="M18 18L6.00003 6M18 6L6.00003 18"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
    />
  </svg>
</template>
