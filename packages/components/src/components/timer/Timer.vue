<script setup lang="ts">
import { computed } from 'vue';
import { toHumanTime } from '@podlove/utils/time';

const props = defineProps({
  time: {
    type: Number,
    default: 0
  },
  remaining: {
    type: Boolean,
    default: false
  }
});

const time = computed(() => toHumanTime(props.time));
</script>

<template>
  <time :datetime="time">{{ `${remaining ? '-' : ''}${time}` }}</time>
</template>
