<template>
  <svg
    :width="size"
    :height="size * 0.545"
    viewBox="0 0 11 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.5 0.5L0 6L11 6L5.5 0.5Z" :fill="color" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 11
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
