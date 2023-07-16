<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 24
  }
});
</script>

<template>
  <icon
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
  >
    <path
      d="M15 13C15.2989 12.8004 15.5 12.4273 15.5 12C15.5 11.5727 15.2989 11.1996 15 11"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
    />
    <path
      d="M2.65 8.75C2.65 8.69477 2.69477 8.65 2.75 8.65H5.73691C6.05481 8.65 6.36325 8.54181 6.61149 8.34322L11.2006 4.67191C11.2183 4.65773 11.2404 4.65 11.2631 4.65H12.25C12.3052 4.65 12.35 4.69477 12.35 4.75V19.25C12.35 19.3052 12.3052 19.35 12.25 19.35H11.2631C11.2404 19.35 11.2183 19.3423 11.2006 19.3281L6.61149 15.6568C6.36325 15.4582 6.05481 15.35 5.73691 15.35H2.75C2.69477 15.35 2.65 15.3052 2.65 15.25V8.75Z"
      stroke="currentColor"
      stroke-width="1.3"
    />
  </icon>
</template>
