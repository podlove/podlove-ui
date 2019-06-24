<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="11.45"
      :stroke="color"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect x="9" y="8" width="2" height="8" rx="1" :fill="color" />
    <rect x="13" y="8" width="2" height="8" rx="1" :fill="color" />
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
