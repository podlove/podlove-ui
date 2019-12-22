<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2.5" y="4.5" width="19" height="15" rx="1" :stroke="color" />
    <path
      d="M9.55 15.1101V8.88992L15.7702 12L9.55 15.1101Z"
      :stroke="color"
      stroke-width="1.1"
      stroke-linejoin="round"
    />
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
