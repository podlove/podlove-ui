<template>
  <div class="podlove-component-divider"></div>
</template>

<style lang="postcss">
.podlove-component-divider {
  height: 1px;
  background-position: 0 100%;
  background-size: 4px 1px;
  background-repeat: repeat-x;
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: pixelated;
  background-image: linear-gradient(
    90deg,
    var(--podlove-component-divider-color, var(--podlove-components-background)) 25%,
    rgba(128, 126, 124, 0) 0
  );
}
</style>
