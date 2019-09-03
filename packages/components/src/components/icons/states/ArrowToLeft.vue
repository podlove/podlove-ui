<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 12L6 8L10 4" stroke="black" stroke-linecap="round" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 16
    }
  }
}
</script>
