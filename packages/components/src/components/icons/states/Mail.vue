<script lang="ts" setup>
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
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-if="!filled"
      d="M4.5 6.5H23.5M4.5 6.5V21.5M4.5 6.5L11 13.5M23.5 6.5V21.5M23.5 6.5L17 13.5M23.5 21.5H4.5M23.5 21.5L17 13.5M4.5 21.5L11 13.5M11 13.5L14 16.3333L17 13.5"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-else
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 6.87936V21.0562L10.2024 13.5247L4 6.87936ZM4.78135 21.995C4.81212 21.9983 4.84336 22 4.875 22H23.125C23.1566 22 23.1879 21.9983 23.2186 21.995L16.9451 14.3772L14.412 16.7695C14.1807 16.9879 13.8193 16.9879 13.588 16.7695L11.0549 14.3772L4.78135 21.995ZM24 21.0562V6.87935L17.7976 13.5247L24 21.0562ZM23.1778 6.00157C23.1603 6.00053 23.1427 6 23.125 6H4.875C4.85727 6 4.83966 6.00053 4.82219 6.00157L11.4257 13.0768L14 15.508L16.5743 13.0768L23.1778 6.00157Z"
      fill="currentColor"
    />
  </svg>
</template>
