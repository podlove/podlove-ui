<template>
  <span class="flex justify-center items-center" aria-hidden="true">
    <icon :size="size" />
    <slot />
  </span>
</template>

<script lang="ts" setup>
import Icon from '../../icons/Pause.vue';

defineProps({
  size: {
    type: Number,
    default: 25
  }
});
</script>

<style lang="scss" scoped></style>
