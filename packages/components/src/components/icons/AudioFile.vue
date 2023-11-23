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
      d="M20.001 12.3711C20.001 7.74786 16.4193 4 12.001 4C7.5827 4 4.00098 7.74786 4.00098 12.3711"
      stroke="currentColor"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.10647 15.9112V20.5166C4.56293 20.5166 2.50098 18.4547 2.50098 15.9112C2.50098 13.3676 4.56293 11.3057 7.10647 11.3057V15.9112Z"
      stroke="currentColor"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.8955 15.9112L16.8955 20.5166C19.439 20.5166 21.501 18.4547 21.501 15.9112C21.501 13.3676 19.439 11.3057 16.8955 11.3057V15.9112Z"
      stroke="currentColor"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </icon>
</template>
