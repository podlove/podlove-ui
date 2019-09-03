<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.33301 2.66663L7.66634 5.99996L4.33301 9.33329"
      stroke="black"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 12
    }
  }
}
</script>
