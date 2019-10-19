<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="19.45"
      y1="6.55"
      x2="12.55"
      y2="6.55"
      :stroke="color"
      stroke-width="1.1"
      stroke-linecap="round"
    />
    <line
      x1="19.45"
      y1="11.55"
      x2="12.55"
      y2="11.55"
      :stroke="color"
      stroke-width="1.1"
      stroke-linecap="round"
    />
    <line
      x1="19.45"
      y1="16.55"
      x2="4.55"
      y2="16.55"
      :stroke="color"
      stroke-width="1.1"
      stroke-linecap="round"
    />
    <path
      d="M4.55 6.29238C4.55 6.13882 4.7159 6.04255 4.84923 6.11874L9.58755 8.82635C9.72192 8.90313 9.72192 9.09687 9.58755 9.17365L4.84923 11.8813C4.7159 11.9575 4.55 11.8612 4.55 11.7076V6.29238Z"
      :stroke="color"
      stroke-width="1.1"
      stroke-linecap="round"
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
