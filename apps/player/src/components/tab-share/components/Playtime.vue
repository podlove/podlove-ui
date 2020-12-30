<template>
  <input-checkbox
    data-test="tab-share--playtime"
    :label="$t('SHARE.PLAYTIME', { playtime: toHumanTime(state.playtime) })"
    :value="state.content === 'time'"
    :color="state.color"
    :border-color="state.color"
    :background="state.background"
    @change="toggleContent"
  />
</template>

<script>
import InputCheckbox from '@podlove/components/input-checkbox'
import { selectContent } from '@podlove/player-actions/share'
import { toHumanTime } from '@podlove/utils/time'
import { mapState, injectStore } from 'redux-vuex'
import select from 'store/selectors'

export default {
  components: {
    InputCheckbox
  },
  setup() {
    return {
      state: mapState({
        playtime: select.playtime,
        content: select.share.content,
        color: select.theme.brandDark,
        background: select.theme.alt
      }),
      dispatch: injectStore().dispatch
    }
  },
  methods: {
    toHumanTime,
    toggleContent() {
      if (this.state.content === 'time') {
        return this.dispatch(selectContent('episode'))
      }

      return this.dispatch(selectContent('time'))
    }
  }
}
</script>
