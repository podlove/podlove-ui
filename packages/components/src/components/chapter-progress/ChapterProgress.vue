<template>
  <div
    ref="progressContainer"
    class="relative flex items-center px-2 py-0"
    aria-hidden="true"
    @mouseout="progressOut"
    @mousemove.alt="progressMove"
    @click.exact="progressClick"
    @click.alt="contextProgressClick"
  >
    <span class="title pointer-events-none" aria-hidden="true">
      {{ chapter.title }}
    </span>
    <span v-if="hasLink" class="link flex">
      <icon class="icon flex-shrink-0" type="link" />
      <a
        class="font-medium whitespace-no-wrap"
        :href="chapter.href"
        target="_blank"
        @mouseover="linkOver"
        @mouseleave="linkLeave"
      >
        {{ chapter.linkTitle }}
      </a>
    </span>
    <timer
      class="timer block text-right pointer-events-none pr-2"
      :time="remainingTime"
      :remaining="(chapter.active || !!ghostActive) && playtime > 0"
    />
    <span
      class="chapter-progress-bar absolute left-0 bottom-0 pointer-events-none"
      :style="progressStyle"
      aria-hidden="true"
    />
    <span
      class="chapter-progress-bar absolute left-0 bottom-0 pointer-events-none"
      :style="progressGhostStyle"
      aria-hidden="true"
    />
  </div>
</template>

<script>
import { disableGhost, enableGhost } from '@podlove/player-actions/progress'
import { setChapter } from '@podlove/player-actions/chapters'
import { simulatePlaytime, requestPlaytime } from '@podlove/player-actions/timepiece'
import { requestPlay } from '@podlove/player-actions/play'

import { background } from '../../defaults'
import { fade } from 'farbraum'
import Icon from '../icons/Icon'
import Timer from '../timer/Timer'

export default {
  components: {
    Icon,
    Timer
  },
  props: {
    chapter: {
      type: Object,
      default: () => ({
        start: 0,
        end: 0,
        title: '',
        href: null,
        linkTitle: null,
        active: false
      })
    },
    showLink: {
      type: Boolean,
      default: false
    },
    playtime: {
      type: Number,
      default: 0
    },
    ghost: {
      type: Number,
      default: 0
    },
    progressColor: {
      type: String,
      default: background
    }
  },

  computed: {
    progressStyle() {
      if (!this.chapter.active || this.playtime > this.chapter.end) {
        return {}
      }

      return {
        width: this.progress(this.playtime),
        'background-color': this.progressColor
      }
    },

    ghostActive() {
      return this.ghost && this.ghost > this.chapter.start && this.ghost < this.chapter.end
    },

    progressGhostStyle() {
      if (!this.ghostActive) {
        return {}
      }

      return {
        width: this.progress(this.ghost),
        'background-color': fade(this.progressColor, 0.7)
      }
    },

    remainingTime() {
      if (this.chapter.active) {
        return this.chapter.end - this.playtime
      }

      if (this.ghostActive) {
        return this.chapter.end - this.ghost
      }

      return this.chapter.end - this.chapter.start
    },

    hasLink() {
      return this.chapter.href && this.showLink
    }
  },

  methods: {
    hoverPlaytime(event) {
      const clientRect = this.$refs.progressContainer.getBoundingClientRect()
      return (
        this.chapter.start +
        ((this.chapter.end - this.chapter.start) * (event.clientX - clientRect.left)) /
          clientRect.width
      )
    },

    progress(time) {
      return `${((time - this.chapter.start) * 100) / (this.chapter.end - this.chapter.start)}%`
    },

    progressClick() {
      this.$emit('chapter', setChapter(this.chapter.index - 1))
      this.$emit('play', requestPlay())
      return false
    },

    contextProgressClick(event) {
      this.$emit('playtime', requestPlaytime(this.hoverPlaytime(event)))
      this.$emit('play', requestPlay())
      event.preventDefault()
      return false
    },

    progressOut() {
      this.$emit('ghost', disableGhost())
    },

    progressMove(event) {
      this.$emit('ghost', enableGhost())

      this.$emit('simulate', simulatePlaytime(this.hoverPlaytime(event)))
    },

    linkOver() {
      this.$emit('hover', true)
    },

    linkLeave() {
      this.$emit('hover', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: calc(100% - 4.4em);
}

.link {
  max-width: calc(40%);
}

.icon {
  margin-top: -2px;
}

.timer {
  min-width: 4.4em;
}

.chapter-progress-bar {
  height: 3px;
}
</style>
