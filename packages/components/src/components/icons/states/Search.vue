<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="11" r="5.35" :stroke="color" stroke-width="1.3" />
    <path d="M14 15L18.5 19.5" :stroke="color" stroke-width="1.3" stroke-linecap="round" />
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
