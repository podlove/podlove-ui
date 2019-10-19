<template lang="pug">
  a(download :href="file.url" data-test="tab-files--download")
    div.flex.h-10
      span.h-full.flex.items-center.pr-4
        icon(type="download" :filled="true")
      div.w-full
        h3(:style="font") {{ file.title }}
        div.opacity-50.text-sm
          span.uppercase(:style="font") {{ type }}
          span.px-2 -
          span {{ toMegabyte(file.size) }} MB
</template>

<script>
import { mapState } from 'redux-vuex'
import { Icon } from '@podlove/components'
import { toMegabyte } from '@podlove/utils/math'

import select from 'store/selectors'
export default {
  components: {
    Icon
  },

  props: {
    type: {
      type: String,
      default: null
    },
    file: {
      type: Object,
      default: () => ({
        title: null,
        size: null,
        mimeType: null,
        url: null
      })
    }
  },

  data: mapState({
    font: select.theme.fontBold
  }),

  methods: {
    toMegabyte
  }
}
</script>
