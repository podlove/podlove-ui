<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 21
  }
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 21 21"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-207.000000, -398.000000)">
        <g transform="translate(0.000000, 341.000000)">
          <rect fill="currentColor" x="207" y="57" width="21" height="21" rx="10.5" />
          <rect
            fill="currentColor"
            transform="translate(217.500000, 67.772971) rotate(45.000000) translate(-217.500000, -67.772971) "
            x="213"
            y="67.0229708"
            width="9"
            height="1.5"
          />
          <polygon
            fill="currentColor"
            transform="translate(217.500000, 67.772971) rotate(135.000000) translate(-217.500000, -67.772971) "
            points="213 67.0229708 222 67.0229708 222 68.5229708 217.610435 68.5229708 213 68.5229708"
          />
        </g>
      </g>
    </g>
  </svg>
</template>
