<template>
  <div id="progress-bar" class="progress">
    <input
      v-if="isMobile"
      type="range"
      min="0"
      :max="interpolate(duration)"
      :value="interpolate(time)"
      :title="title"
      @change="onChange"
      @input="onInput"
    />
    <input
      v-else
      type="range"
      min="0"
      :max="interpolate(duration)"
      :value="interpolate(time)"
      :title="title"
      @change="onChange"
      @input="onInput"
      @mousemove="onMouseMove"
      @mouseout="onMouseOut"
    />
    <span class="progress-range" :style="rangeStyle" />
    <span
      v-for="(buffering, index) in buffer"
      :key="`buffer-${index}`"
      class="progress-buffer"
      :style="bufferStyle(buffering)"
    />
    <span
      v-for="(quantile, index) in quantiles"
      :key="`track-${index}`"
      class="progress-track"
      :style="trackStyle(quantile)"
    />
    <div class="chapters-progress">
      <span
        v-for="(chapter, index) in chapters"
        :key="index"
        class="indicator"
        :style="chapterStyle(chapter)"
      />
    </div>
    <span class="ghost-thumb" :style="ghostStyle" />
    <span class="progress-thumb" :class="{ active: thumbActive }" :style="thumbStyle" />
  </div>
</template>

<script>
import color from 'color'
import { mapActions } from 'redux-vuex'
import { interpolate, relativePosition } from '@podlove/utils/math'
import { isNegative, light, dark } from '@podlove/utils/color'
import { isMobile } from '@podlove/utils/detect'
import { requestPlaytime, simulatePlaytime } from '@podlove/player-actions/timepiece'
import { enableGhost, disableGhost } from '@podlove/player-actions/progress'

import { color as defaultColor, highlight as defaultHighlight } from 'defaults'

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
        'background-color': color(this.thumbColor).fade(0.2),
        'border-color': this.highlightColor
      }
    }
  },
  methods: {
    ...mapActions({
      onChange(_, event) {
        this.$emit('input', requestPlaytime(event.target.value))
      },

      onInput(_, event) {
        this.thumbAnimated = false
        this.$emit('input', requestPlaytime(event.target.value))
        this.$emit('ghost', disableGhost())
      },

      onMouseMove(_, event) {
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
      }
    }),

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
        'background-color': isNegative(this.highlightColor)
          ? color(light).fade(0.5)
          : color(dark).fade(0.7)
      }
    },

    isLast(index) {
      return this.chapters.length - 1 === index
    },

    chapterStyle(chapter) {
      return {
        left: (chapter.end * 100) / this.duration + '%',
        background: this.highlightColor
      }
    },

    interpolate
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'resets';
@import 'tokens/progress';
@import 'tokens/animation';
@import 'tokens/color';

.progress {
  @include range($height, $thumb-width-desktop, $thumb-width-desktop-hover);

  width: 100%;
  position: relative;
  height: $height;
  transition: opacity ($animation-duration / 2), height $animation-duration;
  cursor: pointer;
}

.progress-range {
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(50% - #{$track-height / 2});
  height: $track-height;
  background-color: rgba($accent-color, 0.25);
  pointer-events: none;
}

.progress-track {
  display: block;
  position: absolute;
  left: 0;
  top: calc(50% - #{$track-height / 2});
  height: $track-height;
  pointer-events: none;
}

.progress-thumb {
  position: absolute;
  border: 1px solid;
  // border offset
  margin-left: -2px;
  height: $thumb-height;
  top: calc(50% - #{$thumb-height / 2});
  width: $thumb-width;
  pointer-events: none;

  transition: left $animation-duration / 2;

  &.active {
    width: $thumb-active-width;
    height: $thumb-active-height;
    top: calc(50% - #{$thumb-active-height / 2});
  }
}

.ghost-thumb {
  display: none;
  position: absolute;
  border: 1px solid transparent;
  opacity: 0.8;
  margin-left: -2px;
  height: $thumb-height;
  top: calc(50% - #{$thumb-height / 2});
  width: $thumb-width;
  pointer-events: none;
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

.chapters-progress {
  .indicator {
    position: absolute;
    width: 2px;
    height: 2px;
    top: calc(50% - 1px);
    pointer-events: none;
  }
}
</style>
