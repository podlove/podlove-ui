<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 24
  }
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 5.75263C10 5.18583 10.6045 4.82386 11.1042 5.09152L22.7659 11.3389C23.2937 11.6216 23.2937 12.3784 22.7659 12.6611L11.1042 18.9085C10.6045 19.1761 10 18.8142 10 18.2474V5.75263Z"
      fill="currentColor"
    />
    <path
      d="M22 5.75C22 5.33579 22.3358 5 22.75 5H23.25C23.6642 5 24 5.33579 24 5.75V18.25C24 18.6642 23.6642 19 23.25 19H22.75C22.3358 19 22 18.6642 22 18.25V5.75Z"
      fill="currentColor"
    />
  </svg>
</template>
