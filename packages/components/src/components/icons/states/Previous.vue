<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 14 15"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <polygon
      stroke="none"
      :fill="color"
      fill-rule="evenodd"
      points="13.872375 0.4245 1.249875 7.712 13.872375 14.9995"
    />
    <polygon
      stroke="none"
      :fill="color"
      fill-rule="evenodd"
      points="0 15 3.4375 15 3.4375 0.425 0 0.425"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 15
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
