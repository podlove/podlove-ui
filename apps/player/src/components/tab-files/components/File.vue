<template>
  <a
    download
    :href="file.url"
    data-test="tab-files--download"
    @mouseover="hover(file)"
    @mouseout="hover()"
    @click="select(file)"
  >
    <div class="flex h-10">
      <span class="h-full flex items-center pr-4">
        <icon :type="icon" :filled="true" />
      </span>
      <div class="w-full">
        <h3 :style="state.font">{{ file.title }}</h3>
        <div class="opacity-50 text-sm">
          <span class="uppercase" :style="state.font">{{ type }}</span>
          <span class="px-2">-</span>
          <span>{{ toMegabyte(file.size) }} MB</span>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import { compose, includes, defaultTo, toLower } from 'ramda'
import Icon from '@podlove/components/icons/Icon.vue'
import { toMegabyte } from '@podlove/utils/math'
import { hoverFile, selectFile } from '@podlove/player-actions/files'

import select from '../../../store/selectors'

const isType = (type) => compose(includes(type), toLower, defaultTo(''))
const audio = isType('audio')
const video = isType('video')
const pdf = isType('pdf')
const text = isType('text')

export default {
  components: {
    Icon
  },

  props: {
    file: {
      type: Object,
      default: () => ({
        title: null,
        size: null,
        mimeType: null,
        url: null,
        hover: false
      })
    }
  },

  setup() {
    return {
      state: mapState({
        font: select.theme.fontBold
      }),
      dispatch: injectStore().dispatch
    }
  },

  computed: {
    type() {
      if (audio(this.file.mimeType)) {
        return this.$t('FILES.TYPES.AUDIO')
      }

      if (video(this.file.mimeType)) {
        return this.$t('FILES.TYPES.VIDEO')
      }

      if (text(this.file.mimeType)) {
        return this.$t('FILES.TYPES.TEXT')
      }

      if (pdf(this.file.mimeType)) {
        return this.$t('FILES.TYPES.PDF')
      }

      return ''
    },
    icon() {
      if (this.file.hover) {
        return 'download'
      }

      if (audio(this.file.mimeType)) {
        return 'audio-file'
      }

      if (video(this.file.mimeType)) {
        return 'video-file'
      }

      if (text(this.file.mimeType)) {
        return 'text-file'
      }

      if (pdf(this.file.mimeType)) {
        return 'pdf-file'
      }

      return 'download'
    }
  },

  methods: {
    toMegabyte,
    hover(file) {
      this.dispatch(hoverFile(file))
    },
    select(file) {
      this.dispatch(selectFile(file))
    }
  }
}
</script>
