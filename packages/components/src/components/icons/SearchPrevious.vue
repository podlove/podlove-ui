<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 25
  }
});
</script>

<template>
  <icon
    :width="size"
    :height="size"
    viewBox="0 0 25 25"
  >
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-15.000000, -436.000000)">
        <g transform="translate(0.000000, 341.000000)">
          <rect fill="currentColor" x="15" y="95" width="25" height="25" rx="12.5" />
          <g
            transform="translate(26.500000, 107.500000) rotate(180.000000) translate(-26.500000, -107.500000) translate(23.000000, 103.000000)"
            fill="currentColor"
          >
            <polygon points="0 0 7 4.04139434 0 8.08278867" />
          </g>
        </g>
      </g>
    </g>
  </icon>
</template>
