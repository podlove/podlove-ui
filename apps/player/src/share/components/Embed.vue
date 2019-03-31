<template lang="pug">
  div.copy-code#share-tab--share-embed
    input-group
      tooltip(:negative="negative" :content="$t('MESSAGES.COPIED')" trigger="click" @click="copyCode" slot="button")
        button-component.truncate
          span(aria-hidden="true") {{ $t('SHARE.ACTIONS.COPY') }}
          span.visually-hidden {{ $t('A11Y.COPY_SHARE_LINK') }}

      input-select#tab-share--share-embed--size(slot="input" :value="embedSize" :options="availableSizes" @change="setSize")
      input-text#tab-share--share-embed--input(slot="input" :disabled="true" :value="embedCode")
</template>

<script>
import { mapState } from 'redux-vuex'
import { Button, InputText, InputSelect, InputGroup, Tooltip } from '@podlove/components'
import { selectEmbedSize } from '@podlove/player-actions/embed'
import copy from 'copy-to-clipboard'

import store from 'store'
import select from 'store/selectors'
import inputColor from 'directives/input-color'
import buttonColor from 'directives/button-color'

export default {
  components: {
    ButtonComponent: buttonColor(Button),
    InputSelect: inputColor(InputSelect),
    InputText: inputColor(InputText),
    InputGroup,
    Tooltip
  },
  data: mapState({
    negative: select.styles.negative,
    embedSize: select.share.embedSize,
    availableSizes: select.share.availableEmbedSizes,
    embedCode: select.share.code
  }),
  methods: {
    setSize(val) {
      store.dispatch(selectEmbedSize(val))
    },

    copyCode() {
      copy(this.embedCode)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.copy-code {
  width: 100%;
  display: block;
  margin: ($margin / 2) 0;
}
</style>
