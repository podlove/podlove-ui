<script setup lang="ts">
import { computed, ref } from 'vue';
import { toHumanTime } from '@podlove/utils/time'

const props = defineProps({
  time: {
      type: Number,
      default: 0
    },
    remaining: {
      type: Boolean,
      default: false
    }
})

const time = computed(() => toHumanTime(props.time))
</script>

<template>
  <time class="podlove-timer" :datetime="time">{{
    `${remaining ? '-' : ''}${time}`
  }}</time>
</template>


<style lang="postcss">
.podlove-timer {
  color: var(--podlove-component-timer-color, 'currentcolor')
}
</style>
