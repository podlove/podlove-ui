<template>
  <button :id="`play-button--${type}`" ref="playbutton" class="play-button" @click="clickHandler()">
    <div v-observer="updateSize" class="wrapper flex items-center justify-center" :style="wrapper">
      <transition name="component" mode="out-in">
        <component
          :is="type"
          :id="`play-button--${type}`"
          ref="component"
          class="component"
          :color="color"
          :label="label"
          :size="size / 2"
          :class="{ 'pt-0 pb-0 pr-8 pl-8': label && type !== 'loading', '-ml-1': type === 'play' }"
        >
          <span
            v-if="label"
            class="truncate ml-4 text-base font-thin font-variant-numeric"
            :style="{ color: color }"
            >{{ label }}</span
          >
        </component>
      </transition>
    </div>
  </button>
</template>

<script>
import { background, color } from 'defaults'
import { observer } from 'vue-mutation-observer'

import Play from './states/Play'
import Pause from './states/Pause'
import Loading from './states/Loading'
import Restart from './states/Restart'

import { requestPlay, requestPause, requestRestart } from '@podlove/player-actions/play'

export default {
  directives: {
    observer
  },
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
      validator: (val) => ['play', 'pause', 'loading', 'restart'].includes(val)
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
    },
    size: {
      type: Number,
      default: 50
    }
  },
  emits: {
    play: null,
    pause: null,
    restart: null
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
        width: this.width ? `${this.width}px` : 'auto',
        height: `${this.size}px`,
        'min-width': `${this.size}px`,
        'border-radius': `${this.size / 2}px`
      }
    }
  },
  watch: {
    type() {
      this.updateSize()
    },
    label() {
      this.updateSize()
    }
  },
  mounted() {
    this.updateSize()
  },
  methods: {
    clickHandler() {
      switch (this.type) {
        case 'play':
          this.$emit('play', requestPlay())
          break
        case 'pause':
          this.$emit('pause', requestPause())
          break
        case 'restart':
          this.$emit('restart', requestRestart())
          break
      }
    },

    updateSize() {
      setTimeout(() => {
        const component = this.$refs.playbutton.querySelector('.component')
        this.width = component.clientWidth
      }, 300) // equals animation duration
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme/tokens/animation';
@import '../../theme/tokens/play-button';

.play-button {
  .wrapper {
    transition: all $animation-duration * 4;
  }
}

.component-enter-active,
.component-leave-active {
  transition: opacity $animation-duration ease;
}
.component-enter,
.component-leave-to {
  opacity: 0;
}
</style>
