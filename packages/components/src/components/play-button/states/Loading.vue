<template>
  <div class="loading-indicator" aria-hidden="true">
    <div class="loading-bubble first" :style="style"></div>
    <div class="loading-bubble second" :style="style"></div>
    <div class="loading-bubble third" :style="style"></div>
  </div>
</template>

<script>
  export default {
    props: {
      color: String
    },
    computed: {
      style () {
        return {
          background: this.color || '#000'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bubbles-height: 12px;
  $indicator-width: 65px;

  .loading-indicator {
    padding: 0 30px;
    width: $indicator-width;
    text-align: center;

    .loading-bubble {
      width: $bubbles-height;
      height: $bubbles-height;
      border-radius: 100%;
      display: inline-block;
      animation: loading 1.4s ease-in-out 0s infinite both;
    }

    .first {
      animation-delay: -0.32s;
    }

    .second {
      animation-delay: -0.16s;
    }
  }

  @keyframes loading {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }

</style>
