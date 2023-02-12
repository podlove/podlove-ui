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
      d="M13 8.5H13.5V8V4.15412L20.269 10.5L13.5 16.8459V13V12.5H13C10.2296 12.5 7.99028 13.6863 6.28985 15.1399C4.86147 16.361 3.79765 17.7831 3.09404 18.8911C3.30042 16.6319 3.88594 14.1644 5.22615 12.2066C6.68576 10.0744 9.07053 8.5 13 8.5Z"
      stroke="currentColor"
    />
  </svg>
</template>
