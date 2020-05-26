<template lang="pug">
  div.fixed.flex.items-center.justify-center.w-full.h-full.inset-0#error(v-if="active" :style="{ background: brandLightest }" data-test="error")
    div.p-6.text-center
      h3.text-2xl.mb-5(v-if="title" :style="{ font: headline, color: contrast }" data-test="error--title") {{ $t(title) }}
      p.max-w-xl.mb-5(v-if="message" data-test="error--message" :style="{ color: contrast }") {{ $t(message) }}
      button.px-5.py-2.rounded-sm(v-if="retry" @click.native="retryAction" :style="{ color: alt, background: brandDark, ...headline }"  data-test="error--retry") {{ $t('PLAYER.RETRY') }}
</template>

<script>
import { mapState } from 'redux-vuex'

import store from 'store'
import select from 'store/selectors'

export default {
  data: mapState({
    active: select.error.active,
    title: select.error.title,
    message: select.error.message,
    retry: select.error.retry,
    headline: select.theme.fontBold,
    brandDark: select.theme.brandDark,
    alt: select.theme.alt,
    brandLightest: select.theme.brandLightest,
    contrast: select.theme.contrast
  }),
  methods: {
    retryAction() {
      this.retry && store.dispatch({ type: this.retry })
    }
  }
}
</script>
