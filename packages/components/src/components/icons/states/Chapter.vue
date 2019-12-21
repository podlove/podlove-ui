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
      x2="9.55"
      y2="6.55"
      :stroke="color"
      stroke-width="1.1"
      stroke-linecap="round"
    />
    <line
      x1="19.45"
      y1="11.55"
      x2="9.55"
      y2="11.55"
      :stroke="color"
      stroke-width="1.1"
      stroke-linecap="round"
    />
    <line
      x1="19.45"
      y1="16.55"
      x2="9.55"
      y2="16.55"
      :stroke="color"
      stroke-width="1.1"
      stroke-linecap="round"
    />
    <circle cx="5.5" cy="6.5" r="1" :fill="color" />
    <circle cx="5.5" cy="11.5" r="1" :fill="color" />
    <circle cx="5.5" cy="16.5" r="1" :fill="color" />
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
