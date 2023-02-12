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
      d="M2.65 8.75C2.65 8.69477 2.69477 8.65 2.75 8.65H5.73691C6.05481 8.65 6.36325 8.54181 6.61149 8.34322L11.2006 4.67191C11.2183 4.65773 11.2404 4.65 11.2631 4.65H12.25C12.3052 4.65 12.35 4.69477 12.35 4.75V19.25C12.35 19.3052 12.3052 19.35 12.25 19.35H11.2631C11.2404 19.35 11.2183 19.3423 11.2006 19.3281L6.61149 15.6568C6.36325 15.4582 6.05481 15.35 5.73691 15.35H2.75C2.69477 15.35 2.65 15.3052 2.65 15.25V8.75Z"
      stroke="currentColor"
      stroke-width="1.3"
    />
    <path d="M15.5 14.5L20.5 9.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
    <path d="M20.5 14.5L15.5 9.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
  </svg>
</template>
