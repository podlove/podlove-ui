<template>
  <button id="play-button" ref="playbutton" class="play-button" @click="clickHandler()">
    <div ref="wrapper" class="wrapper" :style="wrapper">
      <transition name="component" mode="out-in" @enter="enterAnimation">
        <component
          :is="type"
          :id="`play-button--${type}`"
          ref="component"
          class="component"
          :color="color"
          :label="label"
          :class="{ 'has-label': label && type !== 'loading' }"
        >
          <span v-if="label" class="label" :style="{ color: color }">{{ label }}</span>
        </component>
      </transition>
      <slot />
    </div>
  </button>
</template>

<script>
import { background, color } from 'defaults'

import Play from './states/Play'
import Pause from './states/Pause'
import Loading from './states/Loading'
import Restart from './states/Restart'

import { requestPlay, requestPause, requestRestart } from '@podlove/player-actions/play'

export default {
  components: {
    Play,
    Pause,
    Loading,
    Restart
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: val => ['play', 'pause', 'loading', 'restart'].includes(val)
    },
    background: {
      type: String,
      default: background
    },
    color: {
      type: String,
      default: color
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      width: null
    }
  },
  computed: {
    wrapper() {
      return {
        'background-color': this.background,
        width: `${this.width}px`
      }
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    clickHandler() {
      switch (this.type) {
        case 'play':
          this.$emit('click', requestPlay())
          break
        case 'pause':
          this.$emit('click', requestPause())
          break
        case 'restart':
          this.$emit('click', requestRestart())
          break
      }
    },
    resize() {
      this.width = this.$refs.component.$el.offsetWidth
    },
    enterAnimation() {
      this.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'resets';
@import 'font';
@import 'tokens/animation';
@import 'tokens/play-button';

.play-button {
  @extend %button;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $button-width;
    min-width: $button-width;
    border-radius: $button-width / 2;
    transition: all $animation-duration * 2;
  }

  .label {
    margin-left: $margin;
    font-size: 1rem;
    font-weight: 200;
    text-transform: uppercase;
    @extend %truncate;
    @extend %font;
  }

  .has-label {
    padding: 0 $padding * 2;
  }
}

.component-enter-active,
.component-leave-active {
  transition: opacity 0.3s ease;
}
.component-enter,
.component-leave-to {
  opacity: 0;
}
</style>
