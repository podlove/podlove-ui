<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 6L9 12L15 18" :stroke="color" stroke-width="1.3" stroke-linecap="round" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
