<script setup lang="ts"></script>

<template>
  <svg
    class="podlove-component-icon"
    aria-hidden="true"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot></slot>
  </svg>
</template>

<style lang="postcss" scoped>
.podlove-component-icon {
  color: var(--podlove-component--icon--color, 'currentColor');
  background: var(--podlove-component--icon--background, 'transparent');
}
</style>
