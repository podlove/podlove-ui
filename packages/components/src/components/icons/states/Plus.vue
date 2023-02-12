<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 16
  }
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 7.1C3.50294 7.1 3.1 7.50294 3.1 8C3.1 8.49706 3.50294 8.9 4 8.9V7.1ZM12 8.9C12.4971 8.9 12.9 8.49706 12.9 8C12.9 7.50294 12.4971 7.1 12 7.1V8.9ZM8.9 4C8.9 3.50294 8.49706 3.1 8 3.1C7.50294 3.1 7.1 3.50294 7.1 4H8.9ZM7.1 12C7.1 12.4971 7.50294 12.9 8 12.9C8.49706 12.9 8.9 12.4971 8.9 12H7.1ZM4 8.9H12V7.1H4V8.9ZM7.1 4V12H8.9V4H7.1Z"
      fill="currentColor"
    />
  </svg>
</template>
