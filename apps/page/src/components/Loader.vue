<template>
  <div :style="style" class="loader">
    <div :style="style"></div>
    <div :style="style"></div>
    <div :style="style"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ size: number }>();
const size = computed(() => props.size);

const style = computed(() => ({
  width: size.value,
  height: size.value
}));
</script>

<style scoped>
.loader,
.loader > div {
  position: relative;
  box-sizing: border-box;
}
.loader {
  display: block;
  font-size: 0;
}
.loader > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}
.loader {
  width: 32px;
  height: 32px;
}
.loader > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  opacity: 0;
  -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
  -moz-animation: ball-scale-multiple 1s 0s linear infinite;
  -o-animation: ball-scale-multiple 1s 0s linear infinite;
  animation: ball-scale-multiple 1s 0s linear infinite;
}
.loader > div:nth-child(2) {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.loader > div:nth-child(3) {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
/*
 * Animation
 */
@-webkit-keyframes ball-scale-multiple {
  0% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  5% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-moz-keyframes ball-scale-multiple {
  0% {
    opacity: 0;
    -moz-transform: scale(0);
    transform: scale(0);
  }
  5% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    -moz-transform: scale(1);
    transform: scale(1);
  }
}
@-o-keyframes ball-scale-multiple {
  0% {
    opacity: 0;
    -o-transform: scale(0);
    transform: scale(0);
  }
  5% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    -o-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes ball-scale-multiple {
  0% {
    opacity: 0;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }
  5% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}
</style>
