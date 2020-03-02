<template lang="pug">
  input-checkbox(:label="$t('SHARE.PLAYTIME', { playtime: toHumanTime(playtime) })" :value="content === 'time'" :color="color" :border-color="color" :background="background" @change="toggleContent" data-test="tab-share--playtime")
</template>

<script>
import InputCheckbox from '@podlove/components/input-checkbox'
import { selectContent } from '@podlove/player-actions/share'
import { toHumanTime } from '@podlove/utils/time'
import { mapState } from 'redux-vuex'
import select from 'store/selectors'
import store from 'store'

export default {
  components: {
    InputCheckbox
  },
  data: mapState({
    playtime: select.playtime,
    content: select.share.content,
    color: select.theme.brandDark,
    background: select.theme.alt
  }),
  methods: {
    toHumanTime,
    toggleContent() {
      if (this.content === 'time') {
        return store.dispatch(selectContent('episode'))
      }

      return store.dispatch(selectContent('time'))
    }
  }
}
</script>
