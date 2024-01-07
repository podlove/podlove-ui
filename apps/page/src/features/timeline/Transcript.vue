<template>
  <div class="p-2">
    <div class="flex items-center mb-2">
      <bullet :top="true" :bottom="true" :time="start">
        <g-link :to="speaker.link">
          <span v-if="speaker.avatar" @mouseover="showPopover" @mouseleave="hidePopover">
            <res-image :src="speaker.avatar" :width="48" :height="48" class="mr-2" />
          </span>
        </g-link>
        <popover direction="right">
          <div class="text-sm text-gray-800 p-1 text-center whitespace-nowrap">
            <h3 class="font-bold">{{ speaker.name }}</h3>
          </div>
        </popover>
      </bullet>
      <a class="block uppercase font-normal cursor-pointer px-2">
        {{ speaker.nickname || speaker.name }}
      </a>
      <div class="ml-auto text-gray-500 font-mono">{{ toHumanTime(start) }}</div>
    </div>
    <div class="flex">
      <div class="w-10 mr-4 flex-shrink-0 relative">
        <div class="h-full w-1 border-gray-500 border-l-2 ml-4"></div>
      </div>
      <div class="px-2">
        <span
          :id="transcriptId(text.start, text.end)"
          :class="{
            'border-b-2 border-primary-200': ghostTranscript(text.start, text.end),
            'border-b-2 border-primary-700': activeTranscript(text.start, text.end),
            'ml-0': index === 0
          }"
          class="mr-1 break-words cursor-pointer"
          @click="play(text.start)"
          @mouseover="simulateSection(text.start, text.end)"
          @mouseout="disableGhost"
          v-for="(text, index) in texts"
          :key="text.start"
          >{{ text.text }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { path, prop, propOr, join } from 'ramda'
import { toHumanTime } from '@podlove/utils/time'
import { mapActions, mapState } from 'redux-vuex'

import { selectors } from '~/store/reducers'
import Bullet from './Bullet'
import ResImage from '~/components/ResImage'
import Popover from '~/components/Popover'

export default {
  components: { Bullet, ResImage, Popover },

  data: mapState({
        ghost: selectors.player.ghost.time,
        hovered: selectors.player.ghost.active,
        current: selectors.current.episode,
        playtime: selectors.player.playtime
      }),
  props: {
    id: {
      type: String,
      default: null
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    speaker() {
      return {
        id: path(['data', 'speaker', 'id'], this),
        slug: path(['data', 'speaker', 'slug'], this),
        avatar: path(['data', 'speaker', 'avatar'], this),
        name: path(['data', 'speaker', 'name'], this),
        nickname: path(['data', 'speaker', 'nickname'], this),
        link: join('/', ['contributor', path(['data', 'speaker', 'slug'], this)])
      }
    },
    start() {
      return prop('start', this.data)
    },

    texts() {
      return propOr([], 'texts', this.data)
    },

    active() {
      return this.current === this.id
    }
  },

  methods: {
    ...mapActions('playEpisode', 'simulatePlaytime', 'enableGhost', 'disableGhost'),
    toHumanTime,
    play(playtime) {
      this.playEpisode({ id: this.id, playtime })
    },
    simulateSection(start) {
      if (!this.active) {
        return
      }

      this.enableGhost()
      this.simulatePlaytime(start)
    },
    activeTranscript(start, end) {
      return this.active && this.playtime >= start && this.playtime < end
    },
    ghostTranscript(start, end) {
      return (
        this.active &&
        !this.activeTranscript(start, end) &&
        this.hovered &&
        this.ghost >= start &&
        this.ghost < end
      )
    },
    transcriptId(start, end) {
      if (this.activeTranscript(start, end)) {
        return 'transcript-active'
      }

      if (this.ghostTranscript(start, end)) {
        return 'transcript-ghost-active'
      }

      return null
    },
    showPopover() {
      this.popoverVisible = true
    },
    hidePopover() {
      this.popoverVisible = false
    }
  }
}
</script>
