<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 28
  },
  filled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <icon
    :width="size"
    :height="size"
    viewBox="0 0 28 28"
  >
    <path
      d="M10.8025 25.0833V15.5064H7.46671V11.0946H10.8025V7.97407C10.8025 4.63831 12.9546 2.91663 15.9675 2.91663C17.3664 2.91663 18.6576 3.02423 18.9805 3.02423V6.5752H16.936C15.3219 6.5752 14.8915 7.32844 14.8915 8.5121V11.0946H19.3033L17.7968 15.5064H14.8915V25.0833H10.8025Z"
      stroke="currentColor"
      :fill="filled ? 'currentColor' : 'transparent'"
      stroke-miterlimit="10"
      stroke-linejoin="round"
    />
  </icon>
</template>
