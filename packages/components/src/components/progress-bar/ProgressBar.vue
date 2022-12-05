<template>
  <div id="progress-bar" class="progress w-full relative cursor-pointer">
    <input
      v-if="isMobile"
      ref="input"
      type="range"
      min="0"
      :max="interpolate(duration)"
      :value="interpolate(time)"
      tabindex="-1"
      aria-hidden="true"
      @change="onChange($event.target.value)"
      @input="onInput($event.target.value)"
    />
    <input
      v-else
      ref="input"
      type="range"
      min="0"
      :max="interpolate(duration)"
      :value="interpolate(time)"
      tabindex="-1"
      aria-hidden="true"
      @change="onChange($event.target.value)"
      @input="onInput($event.target.value)"
      @mousemove="onMouseMove"
      @mouseout="onMouseOut"
    />
    <span
      class="progress-range block absolute w-full left-0 pointer-events-none"
      :style="rangeStyle"
    />
    <span
      v-for="(buffering, index) in buffer"
      :key="`buffer-${index}`"
      tabindex="-1"
      aria-hidden="true"
      class="progress-buffer"
      :style="bufferStyle(buffering)"
    />
    <span
      v-for="(quantile, index) in quantiles"
      :key="`track-${index}`"
      tabindex="-1"
      aria-hidden="true"
      class="progress-track block absolute left-0 pointer-events-none"
      :style="trackStyle(quantile)"
    />
    <div class="chapters-progress">
      <span
        v-for="(chapter, index) in chapters"
        :key="index"
        tabindex="-1"
        aria-hidden="true"
        data-test="progress-bar--chapter-progress--indicator"
        class="absolute pointer-events-none"
        :style="chapterStyle(chapter)"
      />
    </div>
    <span
      class="
        ghost-thumb
        absolute
        hidden
        border-transparent border
        bg-opacity-75
        pointer-events-none
      "
      aria-hidden="true"
      :style="ghostStyle"
    />
    <span
      class="progress-thumb absolute border border-solid pointer-events-none"
      tabindex="-1"
      aria-hidden="true"
      :class="{ active: thumbActive }"
      :style="thumbStyle"
    />
    <input
      type="range"
      class="sr-only"
      :title="title"
      min="0"
      max="100"
      steps="1"
      :value="(time / duration) * 100"
      @change="onChange(($event.target.value / 100) * duration)"
      @input="onInput(($event.target.value / 100) * duration)"
    />
  </div>
</template>

<script>
import RangeTouch from 'rangetouch/dist/rangetouch'
import { fade } from 'farbraum'

import { interpolate, relativePosition } from '@podlove/utils/math'
import { isNegative, light, dark } from '@podlove/utils/color'
import { isMobile } from '@podlove/utils/detect'
import { requestPlaytime, simulatePlaytime } from '@podlove/player-actions/timepiece'
import { enableGhost, disableGhost } from '@podlove/player-actions/progress'

import { color as defaultColor, highlight as defaultHighlight } from '../../defaults'

export default {
  props: {
    time: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    ghost: {
      type: Number,
      default: undefined
    },
    buffer: {
      type: Array,
      default: () => []
    },
    quantiles: {
      type: Array,
      default: () => []
    },
    progressColor: {
      type: String,
      default: defaultColor
    },
    thumbColor: {
      type: String,
      default: defaultColor
    },
    highlightColor: {
      type: String,
      default: defaultHighlight
    },
    title: {
      type: String,
      default: ''
    },
    chapters: {
      type: Array,
      default: () => []
    }
  },
  emit: {
    time: null,
    ghost: null,
    simulate: null
  },
  data() {
    return {
      thumbActive: false,
      isMobile
    }
  },
  computed: {
    rangeStyle() {
      return {
        'background-color': this.progressColor
      }
    },

    thumbStyle() {
      return {
        display: 'block',
        left: relativePosition(this.time, this.duration),
        'background-color': this.thumbColor,
        'border-color': this.highlightColor
      }
    },

    ghostStyle() {
      return {
        display: this.ghost ? 'block' : 'none',
        left: relativePosition(this.ghost, this.duration),
        'background-color': fade(this.thumbColor, 0.2),
        'border-color': this.highlightColor
      }
    }
  },
  mounted() {
    new RangeTouch(this.$refs.input, { watch: false })
  },
  methods: {
    onChange(value) {
      this.$emit('time', requestPlaytime(value))
    },

    onInput(value) {
      this.thumbAnimated = false
      this.$emit('time', requestPlaytime(value))
      this.$emit('ghost', disableGhost())
    },

    onMouseMove(event) {
      if (
        (event.offsetY < 13 && event.offsetY > 31) ||
        event.offsetX < 0 ||
        event.offsetX > event.target.clientWidth
      ) {
        this.thumbActive = false
        this.$emit('ghost', disableGhost())
        return false
      }

      this.thumbAnimated = true
      this.thumbActive = true

      this.$emit(
        'simulate',
        simulatePlaytime((this.duration * event.offsetX) / event.target.clientWidth)
      )
      this.$emit('ghost', enableGhost())

      return false
    },

    onMouseOut() {
      this.thumbActive = false

      this.$emit('ghost', disableGhost())
      this.$emit('simulate', simulatePlaytime(this.time))

      return false
    },

    trackStyle([start, end]) {
      return {
        left: relativePosition(start, this.duration),
        width: relativePosition(end - start, this.duration),
        'background-color': this.thumbColor
      }
    },

    bufferStyle([start, end]) {
      return {
        left: relativePosition(start, this.duration),
        width: relativePosition(end - start, this.duration),
        'background-color': isNegative(this.highlightColor) ? fade(light, 0.5) : fade(dark, 0.7)
      }
    },

    chapterStyle(chapter) {
      const isActive = chapter.start <= this.ghost && chapter.end >= this.ghost

      return {
        left: (chapter.start * 100) / this.duration + '%',
        width: ((chapter.end - chapter.start) * 100) / this.duration + '%',
        'border-right': `2px solid ${this.highlightColor}`,
        height: isActive ? '4px' : '2px',
        background: isActive ? this.progressColor : 'transparent',
        top: isActive ? 'calc(50% - 2px)' : 'calc(50% - 1px)'
      }
    },

    interpolate
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme/resets';
@import '../../theme/tokens/progress';
@import '../../theme/tokens/animation';
@import '../../theme/tokens/color';

.progress {
  @include range($progress-height, $thumb-width-desktop, $thumb-width-desktop-hover);
  height: $progress-height;
  transition: opacity ($animation-duration / 2), height $animation-duration;
}

.progress-range {
  top: calc(50% - #{$track-height / 2});
  height: $track-height;
  background-color: rgba($accent-color, 0.25);
}

.progress-track {
  top: calc(50% - #{$track-height / 2});
  height: $track-height;
}

.progress-thumb {
  margin-left: calc(-1px - #{$thumb-size / 2});
  height: $thumb-size;
  border-radius: $thumb-size;
  top: calc(50% - #{$thumb-size / 2});
  width: $thumb-size;

  transition: left $animation-duration / 2;

  &.active {
    width: $thumb-active-size;
    height: $thumb-active-size;
    border-radius: $thumb-active-size;
    top: calc(50% - #{$thumb-active-size / 2});
  }
}

.ghost-thumb {
  margin-left: calc(-1px - #{$thumb-size / 2});
  height: $thumb-size;
  border-radius: $thumb-size;
  top: calc(50% - #{$thumb-size / 2});
  width: $thumb-size;
}

.progress-buffer {
  display: block;
  opacity: 1;
  position: absolute;
  height: $track-height;
  top: calc(50% - #{$track-height / 2});
  left: 0;
  pointer-events: none;
}
</style>
