<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 24
  },
  filled: {
      type: Boolean,
      default: false
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
      d="M9 10.55H9.55V10V4.55H14.45V10V10.55H15H17.1893C17.3675 10.55 17.4568 10.7654 17.3308 10.8914L12 16.2222L6.66924 10.8914C6.54325 10.7654 6.63248 10.55 6.81066 10.55H9Z"
      stroke="currentColor"
      :fill="filled ? 'currentColor' : 'transparent'"
      stroke-width="1.1"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path d="M4 19.5H20" stroke="currentColor" stroke-width="1.1" />
  </svg>
</template>
