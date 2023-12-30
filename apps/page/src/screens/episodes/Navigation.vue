<template>
  <div
    class="w-full bottom-0 h-16 flex mt-0"
    :class="{ 'fixed top-0 z-40': docked, absolute: !docked }"
  >
    <div
      class="h-20 relative w-full flex items-center justify-center"
      :class="{ 'bg-white -mb-4': !docked, 'bg-transparent': docked }"
    >
      <span class="w-full absolute top-0 shadow left" v-if="!docked"></span>
    </div>

    <div
      class="text-gray-100 h-16 flex justify-center items-center py-4 px-8 w-full"
      :class="{ 'bg-primary-900 shadow rounded-b': docked }"
      :style="style"
    >
      <!-- Discuss -->
      <button
        class="mx-4 font-light flex items-center overflow-visible"
        @click="scrollTo('header')"
      >
        <summary-icon class="mr-3" />
        <span class="uppercase hidden md:block">{{ $t('EPISODE.SUMMARY') }}</span>
      </button>
      <!-- Shownotes -->
      <button
        class="mx-4 font-light flex items-center overflow-visible"
        @click="scrollTo('shownotes')"
        v-if="shownotes"
      >
        <shownotes-icon class="mr-3" />
        <span class="uppercase hidden md:block">{{ $t('EPISODE.SHOWNOTES') }}</span>
      </button>
      <!-- Subscribe -->
      <button
        class="mx-4 font-light flex items-center justify-center overflow-visible"
        @click="scrollTo('timeline')"
      >
        <timeline-icon class="mr-3" />
        <span class="uppercase hidden md:block">{{ $t('EPISODE.TIMELINE') }}</span>
      </button>
      <!-- Comments -->
      <button
        v-if="comments"
        class="mx-4 font-light flex items-center overflow-visible"
        @click="scrollTo('discuss')"
      >
        <discuss-icon class="mr-3" />
        <span class="uppercase hidden md:block">{{ $t('EPISODE.DISCUSS') }}</span>
      </button>
    </div>

    <div class="h-20 relative w-full -mb-4" :class="{ 'bg-white -mb-4': !docked }">
      <span class="w-full absolute top-0 shadow right" v-if="!docked"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import scrollIntoView from 'scroll-into-view-if-needed'

import { Icon } from '~/externals'
import { background } from '~/config'
import TimelineIcon from '~/components/icon/Timeline'
import SummaryIcon from '~/components/icon/Summary'
import ShownotesIcon from '~/components/icon/Shownotes'

const props = defineProps<{
  shownotes: boolean;
}>()

const docked = ref(false);

export default {
  props: {
    comments: {
      type: Boolean,
      default: false
    },
    shownotes: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      docked: false
    }
  },
  components: { Icon, DiscussIcon, TimelineIcon, SummaryIcon, ShownotesIcon },
  mounted() {
    this.handleScroll()
    window && window.addEventListener('scroll', throttle(100, this.handleScroll.bind(this)))
  },
  methods: {
    handleScroll() {
      const height = this.$el.clientHeight
      const top = this.$el.offsetTop
      const scroll = window.scrollY

      this.docked = scroll > height + top + 100
    },

    scrollTo(id) {
      const node = document.getElementById(id)
      node && scrollIntoView(node, { behavior: 'smooth', scrollMode: 'always', block: 'start' })
    }
  },
  computed: {
    style() {
      if (background && this.docked) {
        return {
          'background-image': `url(${background})`
        }
      }
      return {}
    }
  }
}
</script>

<style scoped>
.shadow.left {
  height: 1px;
  bottom: 3em;
  margin-top: -1px;
}

.shadow.right {
  height: 1px;
  bottom: 3em;
  margin-top: -1px;
}

.docked {
  transition: z-index 300ms;
}
</style>
