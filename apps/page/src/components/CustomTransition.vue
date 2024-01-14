<template>
  <transition :name="type">
    <slot />
  </transition>
</template>

<script lang="ts" setup>
defineProps<{
  type: 'playbar' | 'fade' | 'chapters'
}>()
</script>

<style>
/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Playbar */
.playbar-enter-active,
.playbar-leave-active {
  transition: margin 0.5s, opacity 0.5s;
}
.playbar-enter,
.playbar-leave-to {
  opacity: 0;
  margin-bottom: -70px;
}

/* Chapters */
.chapters-enter-active,
.chapters-leave-active {
  transition: bottom 0.5s;
}
.chapters-enter,
.chapters-leave-to {
  bottom: -1000px !important;
}
</style>
