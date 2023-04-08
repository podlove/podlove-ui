<template>
  <icon type="loading" :size="size" aria-hidden="true" />
</template>

<script lang="ts" setup>
import Icon from '../../icons';

defineProps({
  size: {
    type: Number,
    default: 25
  }
});
</script>

<style lang="scss" scoped></style>
