<template lang="pug">
  a(download :href="file.url" data-test="tab-files--download" @mouseover="hover(file)" @mouseout="hover()" @click="select(file)")
    div.flex.h-10
      span.h-full.flex.items-center.pr-4
        icon(:type="icon" :filled="true")
      div.w-full
        h3(:style="font") {{ file.title }}
        div.opacity-50.text-sm
          span.uppercase(:style="font") {{ type }}
          span.px-2 -
          span {{ toMegabyte(file.size) }} MB
</template>

<script>
import { mapState } from 'redux-vuex'
import { compose, includes, defaultTo, toLower } from 'ramda'
import Icon from '@podlove/components/icons'
import { toMegabyte } from '@podlove/utils/math'
import { hoverFile, selectFile } from '@podlove/player-actions/files'

import select from 'store/selectors'
import store from 'store'

const isType = type => compose(includes(type), toLower, defaultTo(''))
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

  data: mapState({
    font: select.theme.fontBold
  }),

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
    hover: compose(store.dispatch, hoverFile),
    select: compose(store.dispatch, selectFile)
  }
}
</script>
