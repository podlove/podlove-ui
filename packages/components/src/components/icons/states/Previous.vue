<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 5.75263C14 5.18583 13.3955 4.82386 12.8958 5.09152L1.23407 11.3389C0.706292 11.6216 0.706293 12.3784 1.23407 12.6611L12.8958 18.9085C13.3955 19.1761 14 18.8142 14 18.2474V5.75263Z"
      :fill="color"
    />
    <path
      d="M2 5.75C2 5.33579 1.66421 5 1.25 5H0.75C0.335787 5 0 5.33579 0 5.75V18.25C0 18.6642 0.335787 19 0.75 19H1.25C1.66421 19 2 18.6642 2 18.25V5.75Z"
      :fill="color"
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
