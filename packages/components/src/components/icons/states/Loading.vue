<template>
  <div class="loading-indicator" aria-hidden="true">
    <div class="loading-bubble first" :style="bubbleStyle"></div>
    <div class="loading-bubble second" :style="bubbleStyle"></div>
    <div class="loading-bubble third" :style="bubbleStyle"></div>
  </div>
</template>

<script>
  import { color } from 'defaults'

  export default {
    props: {
      color: {
        type: String,
        default: color
      },
      size: {
        type: Number,
        default: 12
      }
    },
    computed: {
      bubbleStyle () {
        return {
          background: this.color,
          width: `${this.size}px`,
          height: `${this.size}px`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading-indicator {
    display: flex;
    text-align: center;
    justify-content: space-between;

    .loading-bubble {
      margin: 0 3px;
      border-radius: 100%;
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
