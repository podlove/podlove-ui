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
    <polygon
      fill="none"
      stroke="currentColor"
      stroke-width="1.01"
      points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"
    />
  </svg>
</template>
